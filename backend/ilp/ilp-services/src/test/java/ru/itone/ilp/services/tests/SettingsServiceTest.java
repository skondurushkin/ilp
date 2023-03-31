package ru.itone.ilp.services.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.services.configuration.ServicesTestConfiguration;
import ru.itone.ilp.services.settings.SettingsService;

@Slf4j
class SettingsServiceTest extends ServicesTestConfiguration {

    @Autowired
    SettingsService settingsService;

    @Test
    void test_settingsService() {
        assertFalse(settingsService.getSetting("fake.key").isPresent());
        assertFalse(settingsService.deleteProperty("fake.key"));
        assertNotNull(settingsService.updateOrCreate("test.setting", "Test value"));
        assertEquals("Test value", settingsService.getSetting("test.setting").get().getValue());
        assertTrue(settingsService.deleteProperty("test.setting"));
        assertFalse(settingsService.getSetting("test.setting").isPresent());
    }

}
