package ru.itone.ilp.server.jwt.advice;

import jakarta.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.context.request.WebRequest;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.exception.ApiExceptions.TokenRefreshException;
import ru.itone.ilp.openapi.model.ErrorMessage;
import ru.itone.ilp.openapi.model.ErrorMessage.CategoryEnum;

@Slf4j
@RestControllerAdvice
@NoArgsConstructor
public class ApiControllerAdvice {

    @ExceptionHandler(value = HttpStatusCodeException.class)
    public ErrorMessage handleStatusCodeException(HttpStatusCodeException ex, WebRequest request) {
        return buildErrorMessage(HttpStatus.valueOf(ex.getStatusCode().value()), ex, request);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleValidationException(ConstraintViolationException ex, WebRequest request) {
        return buildErrorMessage(HttpStatus.BAD_REQUEST, ex, request);
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleStatusCodeException(ResourceNotFoundException ex, WebRequest request) {
        return buildErrorMessage(HttpStatus.NOT_FOUND, ex, request);
    }

    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        return buildErrorMessage(HttpStatus.FORBIDDEN, ex, request);
    }

    private static ErrorMessage buildErrorMessage(HttpStatus status, Exception ex, WebRequest request) {
        return new ErrorMessage()
                .statusCode(status.value())
                .statusText(status.getReasonPhrase())
                .timestamp(OffsetDateTime.now())
                .category(CategoryEnum.ERROR)
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .path(request.getContextPath());
    }
}