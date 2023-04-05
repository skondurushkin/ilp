package ru.itone.ilp.persistence.tests;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.repositories.ActivityRepository;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Slf4j
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ActivityTest extends AbstractPersistenceTest {

    @Autowired
    ActivityRepository activityRepository;

    @Test
    @Order(1)
    void createActivity() {
        Activity activity = new Activity()
            .setName("Менторство")
            .setDescription("Передача знаний своим коллегам")
            .setAmount(25)
            .setInfoLink("/link/info.docx")
            .setStartDate(LocalDate.now());

        Activity save = activityRepository.save(activity);

        assertNotNull(save.getId());

    }

    @Test
    @Order(2)
    void searchActivity() {
        var activities = activityRepository.searchByText("зна", 10);
        assertEquals(1, activities.size());
        assertEquals("Менторство", activities.get(0).getName());
    }
}
