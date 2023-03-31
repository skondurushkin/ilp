package ru.itone.ilp.server.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.NotAcceptableStatusException;
import ru.itone.ilp.exception.ApiExceptions;
import ru.itone.ilp.openapi.api.SettingsApi;
import ru.itone.ilp.openapi.model.SettingRequest;
import ru.itone.ilp.openapi.model.SettingResponse;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.services.settings.SettingsService;

@Slf4j
@RestController
@RequiredArgsConstructor
@Import({WebSecurityConfig.class})
public class SettingsController implements SettingsApi {

    private final SettingsService service;

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProperty(String name) {
        if (service.deleteProperty(name))
            return ResponseEntity.ok().build();

        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<SettingResponse> getProperty(String name) {
        return service.getSetting(name)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ApiExceptions.ResourceNotFoundException("Значение не найдено"));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<SettingResponse> setProperty(SettingRequest settingRequest) {
        if (StringUtils.isBlank(settingRequest.getValue())) {
            throw new NotAcceptableStatusException("Cannot set null value. To delete setting value, use DELETE method.");
        }
        return ResponseEntity.ok(service.updateOrCreate(settingRequest.getName(), settingRequest.getValue()));
    }
}
