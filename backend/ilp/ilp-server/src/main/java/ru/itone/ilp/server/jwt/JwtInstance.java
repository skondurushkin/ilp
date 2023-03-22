package ru.itone.ilp.server.jwt;

import lombok.RequiredArgsConstructor;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.JwtContext;

@RequiredArgsConstructor
public class JwtInstance {
    private final JwtContext jwtContext;

    public JwtClaims getClaims() {
        return jwtContext.getJwtClaims();
    }
    public String getSubject() throws MalformedClaimException {
        return jwtContext.getJwtClaims().getSubject();
    }

}
