package ru.itone.ilp.services.settings;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ru.itone.ilp.openapi.model.SettingResponse;
import ru.itone.ilp.persistence.entities.Setting;
import ru.itone.ilp.persistence.mappers.SettingMapper;
import ru.itone.ilp.persistence.repositories.SettingsRepository;

@Slf4j
@RequiredArgsConstructor
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public boolean deleteProperty(String name) {
        if (!settingsRepository.existsById(name))
            return false;
        settingsRepository.deleteById(name);
        return true;
    }

    public Optional<SettingResponse> getSetting(String name) {
        return settingsRepository.findById(name)
                .map(SettingMapper.INSTANCE::toResponse);
    }

    public SettingResponse updateOrCreate(String name, String value) {
        return SettingMapper.INSTANCE.toResponse(
                settingsRepository.save(
                        new Setting().setKey(name).setValue(value)
                ));
    }
}
