package ru.itone.ilp.services.greetings;

import lombok.RequiredArgsConstructor;
import ru.itone.ilp.persistence.entities.Settings;
import ru.itone.ilp.persistence.repositories.SettingsRepository;

@RequiredArgsConstructor
public class GreetingsService {

    private final SettingsRepository settingsRepository;

    public String getDefaultGreeting() {
        return settingsRepository.findById("greeting.default").map(Settings::getValue).orElse("<undefined>");
    }
}
