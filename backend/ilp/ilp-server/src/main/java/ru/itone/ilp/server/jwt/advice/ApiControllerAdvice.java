package ru.itone.ilp.server.jwt.advice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.ServletException;
import jakarta.validation.ConstraintViolationException;
import java.time.OffsetDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.itone.ilp.exception.ApiExceptions.ConflictException;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.exception.ApiExceptions.TokenRefreshException;
import ru.itone.ilp.exception.FileOperationException;
import ru.itone.ilp.openapi.model.ErrorMessage;
import ru.itone.ilp.openapi.model.ErrorMessage.CategoryEnum;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ApiControllerAdvice extends ResponseEntityExceptionHandler {

    private final ObjectMapper objectMapper;


    @ExceptionHandler(value = RuntimeException.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ErrorMessage handleRuntimeException(RuntimeException ex, WebRequest request) {
        return buildErrorMessage(INTERNAL_SERVER_ERROR, ex, request);
    }

    @ExceptionHandler(value = FileOperationException.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ErrorMessage handleFileOperationException(FileOperationException ex, WebRequest request) {
        return buildErrorMessage(INTERNAL_SERVER_ERROR, ex, request);
    }

    @ExceptionHandler(value = ConflictException.class)
    @ResponseStatus(CONFLICT)
    public ResponseEntity<Object> handleConflictException(ConflictException ex, WebRequest request) {
        ErrorMessage errorMessage = buildErrorMessage(CONFLICT, ex, request);

        return handleExceptionInternal(ex, errorMessage, new HttpHeaders(), CONFLICT, request);
    }


    @ExceptionHandler(value = ResponseStatusException.class)
    public ResponseEntity<ErrorMessage> handleResponseStatusException(ResponseStatusException ex, WebRequest request) {
        return ResponseEntity.status(ex.getStatusCode()).body(buildErrorMessage(HttpStatus.valueOf(ex.getStatusCode().value()), ex, request));
    }


    @ExceptionHandler(value = HttpStatusCodeException.class)
    public ResponseEntity<ErrorMessage>  handleStatusCodeException(HttpStatusCodeException ex, WebRequest request) {
        return ResponseEntity.status(ex.getStatusCode()).body(buildErrorMessage(HttpStatus.valueOf(ex.getStatusCode().value()), ex, request));
    }

    @ExceptionHandler(ServletException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorMessage handleServletException(ServletException ex, WebRequest request) {
        return buildErrorMessage(BAD_REQUEST, ex, request);
    }


    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorMessage handleMethodArgumentValidationException(MethodArgumentTypeMismatchException ex, WebRequest request) {
        return buildErrorMessage(BAD_REQUEST, ex, request);
    }


    @Nullable
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {

        ObjectNode errors = objectMapper.createObjectNode();
        ex.getAllErrors().forEach(e -> errors.put(e.getObjectName(), e.getDefaultMessage()));
        ErrorMessage errorMessage = buildValidationErrorMessage("Ошибка в аргументах метода", errors, request);

        return handleExceptionInternal(ex, errorMessage, headers, status, request);
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
    public ErrorMessage handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
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
