package ru.itone.ilp.persistence.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.fasterxml.jackson.databind.JsonNode;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.persistence.api.DbApi;

@Slf4j
class DbApiTest extends AbstractPersistenceTest {
    @Autowired
    DataSource dataSource;

    @Test
    void test_balance() {
        DbApi dbApi = new DbApi(objectMapper, dataSource);
        JsonNode balance = dbApi.getBalance(2L);
        assertNotNull(balance);
        assertEquals(2, balance.path("userid").asInt());
        assertEquals(balance.path("balance").asInt(),
                balance.path("earned").asInt() - balance.path("spent").asInt());
        log.info("RESULT: {}", balance);
    }
}
