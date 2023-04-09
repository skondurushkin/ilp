package ru.itone.ilp.persistence.tests;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import ru.itone.ilp.persistence.entities.WriteOff;
import ru.itone.ilp.persistence.repositories.WriteOffRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
class WriteOffTest extends AbstractPersistenceTest {

    @Autowired
    WriteOffRepository writeOffRepository;

    @Test
    void test_writeOffFindAllByUserId() {
        Page<WriteOff> pageByUserId = writeOffRepository.findAllByUserId(2L, PageRequest.ofSize(5));
        List<WriteOff> writeOffs = pageByUserId.getContent();
        assertEquals(2, writeOffs.size());
        log.info("RESPONSE: {}", writeOffs);
    }

    @Test
    void test_searchByText() {
        Page<WriteOff> writeOffPage = writeOffRepository.searchByText("фут", PageRequest.ofSize(5));
        List<WriteOff> writeOffs = writeOffPage.getContent();
        assertEquals(1, writeOffs.size());
    }
}
