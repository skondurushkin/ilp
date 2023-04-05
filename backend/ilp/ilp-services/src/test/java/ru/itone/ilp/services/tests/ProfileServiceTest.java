package ru.itone.ilp.services.tests;

import static org.junit.jupiter.api.Assertions.assertTrue;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.services.configuration.ServicesTestConfiguration;
import ru.itone.ilp.services.profiles.ProfileService;

@Slf4j
class ProfileServiceTest extends ServicesTestConfiguration {

    @Autowired
    ProfileService profileService;

    @Test
    void testProfilePaginate() {
        PageRequest request = new PageRequest().page(3).pageSize(3).config(new PageRequestConfig().globalFilter("втор"));
        PaginatedProfileResponse response = profileService.paginate(request);
        log.info("RESPONSE: {}", response);
        assertTrue(response.getHasPrev());

    }
}
