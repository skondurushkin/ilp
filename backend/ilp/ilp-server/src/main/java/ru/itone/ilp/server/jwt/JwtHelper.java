package ru.itone.ilp.server.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jose4j.jwa.AlgorithmConstraints;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.NumericDate;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.HmacKey;
import org.jose4j.lang.JoseException;


@Getter
public class JwtHelper {

    private static final String JWT_ALG = AlgorithmIdentifiers.HMAC_SHA512;
    private static final String JWT_ISSUER = "https://ilp.itone.ru";

    private final HmacKey key;
    private final JwtConsumer jwtConsumer;

    public JwtHelper(String secret) {
        this.key = new HmacKey(sha512(secret));
        this.jwtConsumer = createConsumer(key);
    }

    public JwtBuilder builder() {
        return new JwtBuilder(key)
                .issuer(JWT_ISSUER);
    }

    public JwtInstance parse(String jwt) throws InvalidJwtException {
        return new JwtInstance(getJwtConsumer().process(jwt));
    }

    public JwtClaims getClaims(String jwt) throws InvalidJwtException {
        return parse(jwt).getClaims();
    }

    private JwtConsumer createConsumer(Key key) {
        return new JwtConsumerBuilder()
                .setJwsAlgorithmConstraints(AlgorithmConstraints.DISALLOW_NONE)
                .setRequireIssuedAt()
                .setRequireExpirationTime()
                .setExpectedIssuer(JWT_ISSUER)
                .setVerificationKey(key)
                .build();
    }


    private  static byte[] sha512(String string) {
        return hash("SHA-512", string);
    }

    /** Hashes the given {@code string} using the given {@code algorithm}. */
    private static byte[] hash(String algorithm, String string) {
        try {
            return MessageDigest.getInstance(algorithm)
                    .digest(string.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalArgumentException(String.format("[%s] isn't a valid hash algorithm!", algorithm), ex);
        }
    }

    @Setter
    @Accessors(fluent = true, chain = true)
    public static class JwtBuilder {
        private final JsonWebSignature jws;
        private String issuer = JWT_ISSUER;
        private Duration duration = Duration.ofHours(1);
        private String subject;

        private final Map<String, Object> claims = new HashMap<>();

        private JwtBuilder(HmacKey key) {
            this.jws = new JsonWebSignature();
            this.jws.setAlgorithmHeaderValue(JWT_ALG);
            this.jws.setKey(key);
        }

        public JwtBuilder claim(String key, Object value) {
            if (value == null) {
                claims.remove(key);
            } else {
                claims.put(key, value);
            }
            return this;
        }

        public String build() {
            JwtClaims jwtClaims = createClaims();
            jws.setPayload(jwtClaims.toJson());
            try {
                return jws.getCompactSerialization();
            } catch (JoseException ex) {
                throw new RuntimeException("Cannot build JWT", ex);
            }
        }

        private JwtClaims createClaims() {
            NumericDate now = NumericDate.now();
            JwtClaims jwtClaims = new JwtClaims();
            jwtClaims.setSubject(subject);
            jwtClaims.setIssuer(issuer);
            jwtClaims.setIssuedAt(now);
            jwtClaims.setExpirationTime(NumericDate.fromSeconds(now.getValue() + duration.toSeconds()));

            for (Entry<String, Object> claim : claims.entrySet()) {
                jwtClaims.setClaim(claim.getKey(), claim.getValue());
            }
            return jwtClaims;
        }

    }
}
