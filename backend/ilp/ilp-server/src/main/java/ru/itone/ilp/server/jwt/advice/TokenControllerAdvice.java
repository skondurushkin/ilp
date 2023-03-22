package ru.itone.ilp.server.jwt.advice;

import java.time.OffsetDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import ru.itone.ilp.openapi.exception.TokenRefreshException;
import ru.itone.ilp.openapi.model.ErrorMessage;
import ru.itone.ilp.openapi.model.ErrorMessage.CategoryEnum;

@RestControllerAdvice
public class TokenControllerAdvice {

    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        return new ErrorMessage()
                .statusCode(HttpStatus.FORBIDDEN.value())
                .statusText(HttpStatus.FORBIDDEN.getReasonPhrase())
                .timestamp(OffsetDateTime.now())
                .category(CategoryEnum.ERROR)
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .path(request.getContextPath());
    }
}
