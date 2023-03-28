package ru.itone.ilp.services.filestore;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import ru.itone.ilp.common.FileCheck;
import ru.itone.ilp.common.FileStoreApi;
import ru.itone.ilp.exception.FileOperationError;
import ru.itone.ilp.exception.FileOperationException;

@Slf4j
@RequiredArgsConstructor
public class FileStoreService {

    private final FileStoreApi fileStore;

    public Resource fetchResource(String link) {
        if (fileStore.check(link, FileCheck.EXISTS))
            return null;
        return new ByteArrayResource(fileStore.getContentByteArray(link));
    }

    public String   storeFile(String scope, MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }
        String link = makeLink(scope, file);
        try {
            fileStore.writeContentStream(link, file.getInputStream());
        } catch (IOException ex) {
            throw new FileOperationException(FileOperationError.INVALID_FILE_TYPE);
        }
        return link;
    }

    private String makeLink(String scope, MultipartFile file) {
        return null;
    }
}
