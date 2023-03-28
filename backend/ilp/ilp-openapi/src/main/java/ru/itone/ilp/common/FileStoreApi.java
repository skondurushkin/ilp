package ru.itone.ilp.common;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Stream;
import ru.itone.ilp.exception.FileOperationError;
import ru.itone.ilp.exception.FileOperationException;

/**
 * API файлового хранилища на базе сетевой папки
 * Доступ к файлам за пределами корневой папки запрещен
 */
public interface FileStoreApi {
    // относительный путь к папке для определения доступности хранилища
    String HEALTH_FOLDER = "health";
    String DEFAULT_DIGEST_ALGORITHM = "MD5";

    /**
     * Получает путь к корневой папке данного файлового хранилища
     *
     * @return полный путь к корневой папке хранилища
     */
    Path baseDir();

    /**
     * Получить имя используемого алгоритма дайджеста
     *
     * @return полный путь к корневой папке хранилища
     */
    String digestAlgorithm();

    /**
     * Получить экземпляр алгоритма дайджеста, заданного для данного хранилища
     *
     * @return экземпляр алгоритма дайджеста
     * @throws IllegalStateException если заданный алгоритм не найден
     */
    default MessageDigest getDigest() {
        try {
            return MessageDigest.getInstance(digestAlgorithm());
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException(String.format("Could not find %s digest algorithm", digestAlgorithm()), ex);
        }
    }


    /**
     * Создать файл {@code relative} с содержимым {@code content}
     *
     * @param relative относительный путь к файлу
     * @param content  поток содержимого файла
     * @return строковое представление хэша MD5 содержимого (UPPER CASE)
     */
    String writeContentStream(String relative, InputStream content);

    /**
     * Создать файл {@code relative} с содержимым {@code content}
     *
     * @param relative относительный путь к файлу
     * @param content  массив байтов содержимого файла
     * @return строковое представление хэша MD5 содержимого (UPPER CASE)
     */
    default String writeContentByteArray(String relative, byte[] content) {
        try (InputStream bais = new ByteArrayInputStream(content)) {
            return writeContentStream(relative, bais);
        } catch (IOException e) {
            throw new FileOperationException(FileOperationError.READ_ERROR, e);
        }
    }

    /**
     * Получить содержимое файла {@code relative} в виде входного потока
     *
     * @param relative относительный путь к файлу
     * @return входной поток содержимого файла
     */
    InputStream getContentStream(String relative);

    /**
     * Получить содержимое файла {@code relative} в виде массива байтов
     *
     * @param relative относительный путь к файлу
     * @return массив байтов содержимого файла
     */
    default byte[] getContentByteArray(String relative) {
        try (InputStream is = getContentStream(relative)) {
            return is.readAllBytes();
        } catch (IOException e) {
            throw new FileOperationException(FileOperationError.READ_ERROR, e);
        }
    }

    /**
     * Переместить файл {@code source} в {@code target}
     *
     * @param source  относительный путь к исходному файлу
     * @param target  относительный путь к целевому файлу
     * @param options опции копирования
     * @return путь к целевому файлу
     */
    @SuppressWarnings("UnusedReturnValue")
    Path move(String source, String target, CopyOption... options);

    /**
     * Переименовать (при необходимости переместить) файл {@code source} в {@code target}
     *
     * @param source  относительный путь к исходному файлу
     * @param target  относительный путь к целевому файлу
     * @param options опции копирования
     * @return полный путь к целевому файлу
     */
    Path renameOrMove(String source, String target, CopyOption... options);

    /**
     * Удалить файл {@code relative} из хранилища
     *
     * @param relative относительный путь к файлу
     * @return true если удаление файла прошло успешно
     */
    boolean deleteFile(String relative);

    /**
     * Выполняет указанный набор проверок {@code checks} на файле или папке {@code relative}
     * <br/>
     * См. {@link FileCheck}
     *
     * @param relative относительный путь к файлу или папке
     * @param checks   список проверок
     * @return true если все проверки вернули true
     */
    boolean check(String relative, FileCheck... checks);

    /**
     * Выполнить рекурсивное удаление файлов, удовлетворяющих условию {@code fileFilter} в папках,
     * удовлетворяющих условию {@code directoryFilter}
     *
     * @param relative        путь к папке в хранилище, для которой выполнить рекурсивное удаление
     * @param fileFilter      фильтр удаляемых файлов (null - удалает все)
     * @param directoryFilter фильтр проверяемых папок (null - проверяет все)
     * @return true если рекурсивный обход выполнился
     * @throws FileOperationException в случае ошибки удаления
     */
    @SuppressWarnings("UnusedReturnValue")
    boolean deleteRecursively(String relative, Predicate<Path> fileFilter, Predicate<Path> directoryFilter);

    /**
     * Проверка доступности хранилища
     *
     * @param relative имя контрольного файла
     * @throws IllegalArgumentException в случае проблем с хранилищем
     * @throws FileOperationException   в случае проблем с хранилищем
     */
    void checkHealth(String relative);

    /**
     * Создать дочернее хранилище в папке {@code relative}
     *
     * @param relative        относительный путь к корневой папке дочернего хранилища
     * @param createIfMissing создать папку в случае отсутствия
     * @return экземпляр хранилища
     */
    FileStoreApi subStore(String relative, boolean createIfMissing);

    /**
     * Преобразовать относительный путь {@code relative} в полный
     *
     * @param relative относительный путь к файлу в хранилище
     * @return полный путь к файлу
     */
    default Path makeFullPath(String relative) {
        return makeFullPath(relative, false);
    }

    /**
     * Преобразовать относительный путь {@code relative} в полный с опциональным созданием недостающих папок
     *
     * @param relative      относительный путь
     * @param ensureFolders создать недостающие папки
     * @return полный путь
     */
    default Path makeFullPath(String relative, boolean ensureFolders) {
        try {
            Path ret = Path.of(baseDir().toString(), relative).normalize().toAbsolutePath();
            if (!ret.startsWith(baseDir())) {
                log().error("Недопустимое расположение файла или папки '{}'", relative);
                throw new FileOperationException(FileOperationError.LOCATION_NOT_PERMITTED);
            }
            if (ensureFolders) {
                ensureFolders(ret);
            }
            return ret;
        } catch (InvalidPathException e) {
            log().error("Некорректное значение пути.", e);
            throw new FileOperationException(FileOperationError.INVALID_PATH, e);
        }
    }

    /**
     * Создать отсутствующие папки (вплоть до родительской), присутствующие в пути {@code path}
     *
     * @param path полный путь к файлу или папке
     * @return path
     */
    static Path ensureFolders(Path path) {
        try {
            Files.createDirectories(path.getParent());
            return path;
        } catch (IOException e) {
            log().error("Невозможно создать промежуточные папки {}", path, e);
            throw new FileOperationException(FileOperationError.CREATE_PATH_ERROR, e);
        }
    }


    // ================== UTILITIES ====================

    /**
     * Пороверка пустой папки
     *
     * @param path полный путь к папке
     * @return true если папка пуста
     */
    static boolean isEmpty(Path path) {
        if (Files.isDirectory(path)) {
            try (Stream<Path> entries = Files.list(path)) {
                return entries.findFirst().isEmpty();
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }
        }
        return false;
    }

    /**
     * Проверка правильности заданного пути к корневой папке хранилища
     *
     * @param baseDir путь к корневой папке
     * @return нормализованный полный путь к корневой папке
     * @throws IllegalArgumentException если задаваемый путь не является абсолютным или указывает
     *                                  на несуществующую папку или пака недоступна для чтения и записи
     */
    static Path verifyBaseDir(Path baseDir) {
        baseDir = Objects.requireNonNull(baseDir).normalize();
        if (!baseDir.isAbsolute()) {
            if (OS.CURRENT == OS.OSType.WINDOWS) {
                // For windows hosted development machines
                baseDir = baseDir.toAbsolutePath();
            } else {
                throw new IllegalArgumentException("Требуется полный путь к корневой папке");
            }
        }

        if (!FileCheck.directoryExists(baseDir, FileCheck.IS_READABLE, FileCheck.IS_WRITABLE)) {
            throw new IllegalArgumentException("Корневая папка отсутствует или недоступна для чтения/записи");
        }

        return baseDir;
    }

    // Use @Slf4j in interface
    @Slf4j
    class Log {
    }

    static Logger log() {
        return Log.log;
    }
}
