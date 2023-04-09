package ru.itone.ilp.services.filestore;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.tika.Tika;
import org.apache.tika.config.TikaConfig;
import org.apache.tika.detect.ZeroSizeFileDetector;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.mime.MediaType;
import org.apache.tika.mime.MimeTypes;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.UnsupportedMediaTypeStatusException;
import ru.itone.ilp.common.FileCheck;
import ru.itone.ilp.common.FileStoreApi;
import ru.itone.ilp.exception.ApiExceptions;
import ru.itone.ilp.exception.FileOperationError;
import ru.itone.ilp.exception.FileOperationException;

@Slf4j
@RequiredArgsConstructor
public class FileStoreService {

    private static final DateTimeFormatter FILE_NAME_DATE_FORMATTER = DateTimeFormatter.ofPattern(
            "yyMMddHHmmss.SSS");

    private static final Tika tika = new Tika();
    private static final Metadata EMPTY_METADATA = new Metadata();
    private static final MimeTypes MIME_TYPES = TikaConfig.getDefaultConfig().getMimeRepository();
    private static final ZeroSizeFileDetector ZERO_SIZE_FILE_DETECTOR = new ZeroSizeFileDetector();

    private static final Set<String> IMAGE_SUBTYPES = Arrays.stream(new String[]{"gif", "bmp", "png", "jpeg", "tiff"})
            .collect(Collectors.toSet());

    private final FileStoreApi fileStore;

    public TypedResource fetchResource(String link) {
        if (!fileStore.check(link, FileCheck.EXISTS))
            return null;
        try {
            String mime = tika.detect(fileStore.makeFullPath(link));
            if (validMediaType(MediaType.parse(mime))) {
                return new TypedResource(org.springframework.http.MediaType.valueOf(mime), new ByteArrayResource(fileStore.getContentByteArray(link)));
            }
            throw new UnsupportedMediaTypeStatusException("Недопустимый тип содержимого файла '"+ link + "'");
        } catch (IOException exception) {
            throw new ApiExceptions.InternalServerErrorException("Ошибка при определении содержимого файла '"+ link + "'", exception);
        }
    }

    public String   storeFile(String scope, MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }
        String link = makeLink(scope, file).replace('\\', '/');
        try {
            InputStream inputStream = file.getInputStream();
            MediaType mediaType = detectMediaType(inputStream);
            if (validMediaType(mediaType)) {
                fileStore.writeContentStream(link, file.getInputStream());
            }
        } catch (IOException ex) {
            throw new FileOperationException(FileOperationError.INVALID_FILE_TYPE);
        }
        return link;
    }

    private String makeLink(String scope, MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        String name = FilenameUtils.getBaseName(originalFilename);
        String ext = FilenameUtils.getExtension(originalFilename);
        name = StringUtils.replaceChars(name, ' ', '_');

        String targetFileName = String.format("%s_%s.%s", name, currentTimeAsString(), ext);
        Path path = Paths.get(scope, targetFileName);
        return path.normalize().toString();
    }

    public static MediaType detectMediaType(InputStream in) throws IOException {
        if (!in.markSupported()) {
            in = new BufferedInputStream(in);
        }
        if (ZERO_SIZE_FILE_DETECTOR.detect(in, EMPTY_METADATA).equals(MediaType.EMPTY)) {
            return MediaType.EMPTY;
        }

        return MIME_TYPES.detect(in, EMPTY_METADATA);
    }

    public static boolean validMediaType(MediaType mt) {
        return (mt.getType().equals("image") && IMAGE_SUBTYPES.contains(mt.getSubtype()));
    }

    private static String currentTimeAsString() {
        return LocalDateTime.now().format(FILE_NAME_DATE_FORMATTER);
    }

}
