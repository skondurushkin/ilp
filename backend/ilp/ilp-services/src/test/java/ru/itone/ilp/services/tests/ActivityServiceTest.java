package ru.itone.ilp.services.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.services.activities.ActivityService;
import ru.itone.ilp.services.configuration.ServicesTestConfiguration;

@Slf4j
public class ActivityServiceTest extends ServicesTestConfiguration {

    @Autowired
    ActivityService  activityService;

    @Test
    void testActivityCreate() {
        ActivityRequest req = new ActivityRequest().name("Выступление с бубном")
                .startDate(LocalDate.now())
                .description("Выступления на публичных мероприятиях компании с бубном");
        ActivityResponse activity = activityService.createActivity(req);
        assertNotNull(activity);
        assertEquals("Выступление с бубном", activity.getName());
    }
}
