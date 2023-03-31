package ru.itone.ilp.persistence.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.misc.Helpers;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.persistence.mappers.AccrualMapper;
import ru.itone.ilp.persistence.repositories.AccrualRepository;

@Slf4j
class AccrualTest extends AbstractPersistenceTest {

    @Autowired
    AccrualRepository accrualRepository;

    @Test
    void testAccrual_findAllByUserId() {
        List<AccrualResponse> accrualResponses = Helpers.asList(accrualRepository.findAllByUserIdOrderByDateDesc(2L),
                AccrualMapper.INSTANCE::toResponse);
        assertEquals(2, accrualResponses.size());
        log.info("RESPONSE: {}", accrualResponses);
    }

}
