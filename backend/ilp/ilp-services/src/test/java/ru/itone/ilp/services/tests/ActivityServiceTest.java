package ru.itone.ilp.services.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.services.activities.ActivityService;
import ru.itone.ilp.services.configuration.ServicesTestConfiguration;

@Slf4j
class ActivityServiceTest extends ServicesTestConfiguration {

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

    @Test
    void testActivityPaginate() {
        PageRequest request = new PageRequest().page(0).pageSize(4).config(new PageRequestConfig());
        PaginatedActivityResponse response = activityService.paginate(request);
        log.info("RESPONSE: {}", response);
        assertTrue(response.getHasNext());
    }
}
