package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.repositories.ActivityRepository;
import ru.itone.ilp.services.activities.ActivityService;

@Configuration
@RequiredArgsConstructor
@Import(PersistenceConfiguration.class)
public class ActivityConfiguration {

    private final ActivityRepository activityRepository;

    @Bean
    public ActivityService activityService() {
        return new ActivityService(activityRepository);
    }
}
