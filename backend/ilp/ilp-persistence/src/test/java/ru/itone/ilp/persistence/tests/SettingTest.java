package ru.itone.ilp.persistence.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.persistence.repositories.SettingsRepository;

@Slf4j
class SettingTest extends AbstractPersistenceTest {

    @Autowired
    SettingsRepository settingsRepository;

    @Test
    void test_findById() {
        assertEquals("skondurushkin@gmail.com", settingsRepository.findById("admin.email").get().getValue());
        assertTrue(settingsRepository.findById("db.version").isPresent());
        assertFalse(settingsRepository.findById("fake.key").isPresent());
    }
}
