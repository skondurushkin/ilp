package ru.itone.ilp.server.controllers;

import java.nio.file.Paths;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.openapi.api.FilesApi;
import ru.itone.ilp.openapi.model.UploadResponse;
import ru.itone.ilp.services.filestore.FileStoreService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class FileStoreController implements FilesApi {

    private final FileStoreService fileStoreService;

    @Override
    public ResponseEntity<Resource> getFile(String scope, String fileName) {
        String link = Paths.get(scope, fileName).toString();
        return Optional.ofNullable(fileStoreService.fetchResource(link))
                .map( resource -> {
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
                    headers.add("Pragma", "no-cache");
                    headers.add("Expires", "0");

                    return ResponseEntity.ok()
                            .headers(headers)
                            .contentType(resource.mediaType())
                            .body(resource.resource());
        }).orElseThrow(() -> new ResourceNotFoundException("File not found."));
    }

    @Override
    @Secured("hasRole('ADMIN)")
    public ResponseEntity<UploadResponse> uploadFile(String scope, MultipartFile file) {
        ServletUriComponentsBuilder builder = ServletUriComponentsBuilder.fromCurrentContextPath();

        String fileName = fileStoreService.storeFile(scope, file);

        String fileDownloadUri = builder
                .path("/api/ilp/file/" + fileName)
                .toUriString();

        return ResponseEntity.ok(new UploadResponse().link(fileDownloadUri));
    }



}
