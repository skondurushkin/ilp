package ru.itone.ilp.services.configuration;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import ru.itone.ilp.common.FileCheck;
import ru.itone.ilp.common.FileStoreApi;
import ru.itone.ilp.services.filestore.ExtensionService;
import ru.itone.ilp.services.filestore.FileStore;
import ru.itone.ilp.services.filestore.FileStoreService;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class FileStoreConfig {
    public static final String ROOT_STORE_PATH_PROPERTY = "application.root-store-path";
    private final Environment env;

    @Bean
    @ConditionalOnProperty(value = ROOT_STORE_PATH_PROPERTY)
    public FileStoreApi fileStore() throws IOException {
        String rootStorePath = env.getProperty(ROOT_STORE_PATH_PROPERTY);
        if (StringUtils.isBlank(rootStorePath))
            throw new IllegalArgumentException("Не задана корневая папка файлового хранилища. Параметр настройки: " + ROOT_STORE_PATH_PROPERTY);
        Path baseDir = Paths.get(rootStorePath).toAbsolutePath();
        FileStoreApi.ensureFolders(baseDir);
        if (!FileCheck.directoryExists(baseDir)) {
            Files.createDirectory(baseDir);
        }
        log.debug("Using '{}' as root folder of the file storage", baseDir);
        return new FileStore(baseDir);
    }

    @Bean
    public FileStoreService fileStoreService(FileStoreApi fileStore, ExtensionService extensionService) {
        return new FileStoreService(fileStore, extensionService);
    }
}
