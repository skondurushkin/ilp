package ru.itone.ilp.exception;


import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@UtilityClass
public class ApiExceptions {

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public static class InternalServerErrorException extends RuntimeException {
        public InternalServerErrorException(String message) {
            super(message);
        }
        public InternalServerErrorException(String message, Throwable cause) {
            super(message, cause);
        }
    }


    @ResponseStatus(value = HttpStatus.CONFLICT)
    public static class ConflictException extends RuntimeException {
        public ConflictException(String message) {
            super(message);
        }
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public static class PermissionDeniedException extends RuntimeException {
        public PermissionDeniedException(String message) {
            super(message);
        }
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public static class TransitionDeniedException extends RuntimeException {
        public TransitionDeniedException(String message) {
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
