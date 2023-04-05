package ru.itone.ilp.persistence.tests;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import ru.itone.ilp.persistence.entities.Operation;
import ru.itone.ilp.persistence.repositories.OperationRepository;
import ru.itone.ilp.persistence.types.OrderStatus;

@Slf4j
class OperationTest extends AbstractPersistenceTest {

    @Autowired
    OperationRepository operationRepository;

    @Test
    void test_operationPageable() {
        Page<Operation> result = operationRepository.findAllByUserId(2L, PageRequest.of(0, 5, Sort.by(Direction.DESC, "instant")));
        log.info("RESULT: {}", result.getContent());
        result = operationRepository.findAllByUserIdAndAccrualNotNullOrWriteOff_OrderStatusNot(2L, OrderStatus.created, PageRequest.of(0, 5, Sort.by(Direction.DESC, "instant")));
        log.info("RESULT: {}", result.getContent());
    }
}
