package ru.itone.ilp.services.filestore;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Assert;
import ru.itone.ilp.common.FileStoreApi;
import ru.itone.ilp.exception.FileOperationError;
import ru.itone.ilp.exception.FileOperationException;
import ru.itone.ilp.common.FileCheck;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.CopyOption;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardOpenOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Objects;
import java.util.function.Predicate;

@Slf4j
public class FileStore implements FileStoreApi {
    private static final Predicate<Path> alwaysTrue = p -> true;
    private static final byte[] CONTENT = "health_check".getBytes(StandardCharsets.UTF_8);

    private final Path baseDir;
    private final String digestAlgorithm;

    public FileStore(Path baseDir) {
        this(baseDir, null);
    }

    /**
     * Создать хранилище в папке {@code baseDir}
     *
     * @param baseDir         полный путь к корневой папке
     * @param digestAlgorithm имя алгоритма дайджеста, используемого для вычисления хэшей сохраняемых файлов
     * @throws IllegalStateException при проблемах с созданием и правами чтения/записи корневой папки
     */
    public FileStore(Path baseDir, String digestAlgorithm) {
        this.baseDir = FileStoreApi.verifyBaseDir(baseDir);
        this.digestAlgorithm = Objects.requireNonNullElse(digestAlgorithm, DEFAULT_DIGEST_ALGORITHM);
        getDigest();
    }

    @Override
    public Path baseDir() {
        return baseDir;
    }

    @Override
    public String digestAlgorithm() {
        return digestAlgorithm;
    }

    @Override
    public String writeContentStream(String relative, InputStream content) {
        MessageDigest md5 = getDigest();
        try (InputStream dis = new DigestInputStream(content, md5)) {
            Files.copy(dis, makeFullPath(relative, true));
            return Hex.encodeHexString(md5.digest(), false);
        } catch (IOException e) {
            log.error("Невозможно сохранить файл", e);
            throw new FileOperationException(FileOperationError.WRITE_ERROR, e);
        }
    }

    @Override
    public InputStream getContentStream(String relative) {
        try {
            return Files.newInputStream(makeFullPath(relative), StandardOpenOption.READ);
        } catch (IOException e) {
            log.error("Невозможно прочитать содержимое файла", e);
            throw new FileOperationException(FileOperationError.READ_ERROR, e);
        }
    }

    @Override
    public Path move(String source, String target, CopyOption... options) {
        try {
            return Files.move(makeFullPath(source), makeFullPath(target, true), options);
        } catch (IOException e) {
            log.error("Не удалось переместить файл по пути {}", source);
            throw new FileOperationException(FileOperationError.MOVE_ERROR, e);
        }
    }

    @Override
    public Path renameOrMove(String source, String target, CopyOption... options) {
        try {
            Path sourcePath = makeFullPath(source);
            Path targetPath = makeFullPath(target);
            if (sourcePath.equals(targetPath))
                return targetPath;
            if (sourcePath.getParent().equals(targetPath.getParent())) {
                if (!sourcePath.toFile().renameTo(targetPath.toFile()))
                    log.warn("Результат переименования {} в {} : false", source, target);
            } else {
                Files.move(sourcePath, FileStoreApi.ensureFolders(targetPath), options);
            }
            return targetPath;

        } catch (IOException e) {
            log.error("Не удалось переместить/переименовать файл по пути {}", source);
            throw new FileOperationException(FileOperationError.MOVE_ERROR, e);
        }
    }

    @Override
    public boolean deleteFile(String relative) {
        try {
            return Files.deleteIfExists(makeFullPath(relative));
        } catch (IOException e) {
            log.error("Не удалось удалить файл по пути {}", relative);
            throw new FileOperationException(FileOperationError.DELETE_ERROR, e);
        }
    }

    @Override
    public boolean check(String relative, FileCheck... checks) {
        Path path = makeFullPath(relative);
        for (FileCheck check : checks) {
            if (!check.test(path))
                return false;
        }
        return true;
    }

    @Override
    public boolean deleteRecursively(String relative, Predicate<Path> fileFilter, Predicate<Path> directoryFilter) {
        if (StringUtils.isBlank(relative)) {
            return false;
        }

        Path rootPath = makeFullPath(relative);
        if (!Files.exists(rootPath)) {
            log.trace("Относительный путь '{}' задает несуществующую папку", relative);
            return false;
        }

        if (rootPath.equals(baseDir())) {
            log.error("Относительный путь '{}' задает корневую папку хранилища", relative);
            throw new IllegalArgumentException("Cannot delete file storage root directory");
        }

        final Predicate<Path> fFilter = Objects.requireNonNullElse(fileFilter, alwaysTrue);
        final Predicate<Path> dFilter = Objects.requireNonNullElse(directoryFilter, alwaysTrue);

        try {
            Files.walkFileTree(rootPath, new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                    Objects.requireNonNull(dir);
                    Objects.requireNonNull(attrs);
                    if (dFilter.test(dir)) {
                        log.trace("Папка {} выбрана для обработки", baseDir().relativize(dir));
                        return FileVisitResult.CONTINUE;
                    }
                    log.trace("Папка {} не выбрана для обработки", baseDir().relativize(dir));
                    return FileVisitResult.SKIP_SUBTREE;
                }

                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Objects.requireNonNull(file);
                    Objects.requireNonNull(attrs);
                    if (fFilter.test(file)) {
                        log.trace("Удаляется файл {}", baseDir().relativize(file));
                        Files.delete(file);
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    Objects.requireNonNull(dir);
                    if (exc != null)
                        throw exc;
                    if (FileStoreApi.isEmpty(dir)) {
                        log.trace("Удаляется папка {}", baseDir().relativize(dir));
                        Files.delete(dir);
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (UncheckedIOException | IOException e) {
            log.error("Cannot delete folder '{}' recursively", baseDir().relativize(rootPath), e);
            throw new FileOperationException(FileOperationError.DELETE_ERROR, e);
        }
        return true;
    }

    @Override
    public void checkHealth(String relative) {
        FileStore healthStore = (FileStore) subStore(HEALTH_FOLDER, true);

        Path controlFile = healthStore.makeFullPath(relative);
        String relativePath = healthStore.baseDir().relativize(controlFile).toString();

        healthStore.writeContentByteArray(relativePath, CONTENT);
        byte[] contentByteArray = healthStore.getContentByteArray(relativePath);
        Assert.isTrue(
            Arrays.compare(CONTENT, contentByteArray) == 0,
            "Unexpected control file content"
        );
        healthStore.deleteFile(relativePath);
    }

    @Override
    public FileStoreApi subStore(String relative, boolean createIfMissing) {
        Path path = makeFullPath(relative);
        if (createIfMissing) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                log.error("Невозможно создать папку.", e);
                throw new FileOperationException(FileOperationError.CREATE_PATH_ERROR, e);
            }
        }
        return new FileStore(path, digestAlgorithm);
    }

}
