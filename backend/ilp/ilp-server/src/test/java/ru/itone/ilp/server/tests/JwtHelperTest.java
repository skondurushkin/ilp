package ru.itone.ilp.server.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;
import lombok.extern.slf4j.Slf4j;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.server.jwt.JwtHelper;

@Slf4j
class JwtHelperTest extends AbstractServerTest {
    @Autowired
    JwtHelper jwtHelper;

    @Test
    void testParse() throws InvalidJwtException, MalformedClaimException {
        String jwt = jwtHelper.builder().duration(Duration.ofSeconds(3)).subject("javainuse").build();
        JwtClaims claims = jwtHelper.getClaims(jwt);
        log.info("CLAIMS: {}", claims);
        assertEquals("javainuse", claims.getSubject());
    }

}
