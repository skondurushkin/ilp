package ru.itone.ilp.persistence.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.misc.Helpers;
import ru.itone.ilp.persistence.entities.WriteOff;
import ru.itone.ilp.persistence.repositories.WriteOffRepository;

@Slf4j
public class WriteOffTest extends AbstractPersistenceTest {

    @Autowired
    WriteOffRepository writeOffRepository;

    @Test
    void test_writeOffFindAllByUserId() {
        List<WriteOff> writeOffs = Helpers.asList(writeOffRepository.findAllByUserId(2L));
        assertEquals(2, writeOffs.size());
        log.info("RESPONSE: {}", writeOffs);
    }
}
