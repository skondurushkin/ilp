package ru.itone.ilp.server.jwt.advice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.ServletException;
import jakarta.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
@RequiredArgsConstructor
public class ApiControllerAdvice {

    private final ObjectMapper objectMapper;


    @ExceptionHandler(value = HttpStatusCodeException.class)
    public ErrorMessage handleStatusCodeException(HttpStatusCodeException ex, WebRequest request) {
        return buildErrorMessage(HttpStatus.valueOf(ex.getStatusCode().value()), ex, request);
    }

    @ExceptionHandler(ServletException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorMessage handleServletException(ServletException ex, WebRequest request) {
        return buildErrorMessage(BAD_REQUEST, ex, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorMessage handleMethodArgumentValidationException(MethodArgumentNotValidException ex, WebRequest request) {
        ObjectNode errors = objectMapper.createObjectNode();
        ex.getAllErrors().forEach(e -> errors.put(e.getObjectName(), e.getDefaultMessage()));
        return buildValidationErrorMessage("Ошибка в аргументах метода", errors, request);
    }


    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorMessage handleValidationException(ConstraintViolationException ex, WebRequest request) {
        ObjectNode errors = objectMapper.createObjectNode();
        ex.getConstraintViolations().forEach(e -> errors.put(e.getPropertyPath().toString(), e.getMessage()));
        return buildValidationErrorMessage("Нарушение ограничений", errors, request);
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

    private static ErrorMessage buildValidationErrorMessage(String message, ObjectNode details, WebRequest request) {
        return new ErrorMessage()
                .statusCode(BAD_REQUEST.value())
                .statusText(BAD_REQUEST.getReasonPhrase())
                .timestamp(OffsetDateTime.now())
                .category(CategoryEnum.VALIDATION_ERROR)
                .message(message)
                .description(request.getDescription(false))
                .details(details)
                .path(request.getContextPath());
    }

}
