package ru.itone.ilp.server.controllers;

import java.nio.file.Paths;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.itone.ilp.openapi.api.FilesApi;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.openapi.model.UploadFile200Response;
import ru.itone.ilp.services.filestore.FileStoreService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FileStoreController implements FilesApi {

    private final FileStoreService fileStoreService;
    @Override
    public ResponseEntity<Resource> downloadFile(String link) {
        return Optional.ofNullable(fileStoreService.fetchResource(link))
                .map( resource -> {
                    String resourceName = Paths.get(link).getFileName().toString();
                    HttpHeaders headers = new HttpHeaders();
                    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + resourceName);
                    headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
                    headers.add("Pragma", "no-cache");
                    headers.add("Expires", "0");

                    return ResponseEntity.ok()
                            .headers(headers)
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .body(resource);
        }).orElseThrow(() -> new ResourceNotFoundException("File not found."));
    }

    @Override
    public ResponseEntity<UploadFile200Response> uploadFile(String scope, Integer id, MultipartFile filename) {
        return null;
    }

}
