package ru.itone.ilp.server.configuration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;
import lombok.extern.slf4j.Slf4j;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import ru.itone.ilp.server.jwt.JwtHelper;
import ru.itone.ilp.services.configuration.GreetingsConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;

@Slf4j
@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
@WebAppConfiguration
@AutoConfigureMockMvc
@EnableAutoConfiguration
@ComponentScan({"ru.itone.ilp.services.jwt","ru.itone.ilp.server.controllers"})
@ContextConfiguration(classes = {PersistenceConfiguration.class, GreetingsConfiguration.class})
@Import({WebSecurityConfig.class})
class JwtHelperTest {
    @Autowired
    JwtHelper jwtHelper;

    @Test
    void testParse() throws InvalidJwtException, MalformedClaimException, InterruptedException {
        String jwt = jwtHelper.builder().duration(Duration.ofSeconds(3)).subject("javainuse").build();
        JwtClaims claims = jwtHelper.getClaims(jwt);
        log.info("CLAIMS: {}", claims);
        assertEquals("javainuse", claims.getSubject());
    }

}
