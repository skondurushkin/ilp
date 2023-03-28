package ru.itone.ilp.exception;


import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@UtilityClass
public class ApiExceptions {

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    public static class TokenRefreshException extends RuntimeException {

        public TokenRefreshException(String token, String message) {
            super(String.format("Failed for [%s]: %s", token, message));
        }
    }
}
