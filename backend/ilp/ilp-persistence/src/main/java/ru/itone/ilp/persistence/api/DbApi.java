package ru.itone.ilp.persistence.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Duration;
import java.util.Optional;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.postgresql.util.PGobject;
import ru.itone.ilp.persistence.types.EventType;


@Slf4j
@RequiredArgsConstructor
public class DbApi {
    private final ObjectMapper objectMapper;
    private final DataSource dataSource;

    public void logEvent(Long userId, EventType eventType, String message) {
        log.debug("DB API 'public.log_event({}, {}, {})' STARTED", userId,  eventType, message);
        boolean success = false;
        long startTime = System.currentTimeMillis();
        try {
            try(Connection connection = dataSource.getConnection()) {
                callLogEvent(connection, userId, eventType, message);
                success = true;
            }
        } catch (SQLException ex) {
            throw new DbApiException("Ошибка запроса данных", ex);
        } finally {
            log.debug("DB API 'public.log_event({}, {}, {})' {}: duration {}",
                    userId,
                    eventType,
                    message,
                    success ? "SUCCEEDED" : "FAILED",
                    Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

    public JsonNode getBalance(Long userId) {
        log.debug("DB API 'public.balance({})' STARTED", userId);
        boolean success = false;
        long startTime = System.currentTimeMillis();
        try {
            try(Connection connection = dataSource.getConnection()) {
                JsonNode ret = getBalanceJsonNode(connection, userId);
                success = true;
                return ret;
            }
        } catch (SQLException ex) {
            throw new DbApiException("Ошибка запроса данных", ex);
        } finally {
            log.debug("DB API 'public.balance({})' {}: duration {}",
                    userId,
                    success ? "SUCCEEDED" : "FAILED",
                    Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

    private void callLogEvent(Connection connection, Long userId, EventType eventType, String message) throws SQLException {
        try(PreparedStatement ps = prepareLogEvent(connection, userId, eventType, message)) {
            try {
                ps.execute();
            } catch (SQLException exception) {
                throw new DbApiException("Ошибка выполнения запроса данных", exception);
            }
        } catch (DbApiException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new DbApiException("Неожиданная ошибка", exception);
        }
    }


    private JsonNode getBalanceJsonNode(Connection connection, Long userId) throws SQLException {
        try(PreparedStatement ps = prepareBalance(connection, userId)) {
            try(ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    try {
                        JsonNode ret = toResponse(rs.getObject(1, PGobject.class));
                        return ret;
                    } catch (JsonProcessingException exception) {
                        throw new DbApiException("Недопустимый результат запроса", exception);
                    }
                }
                throw new DbApiException("Сервер вернул пустой результат");
            } catch (SQLException exception) {
                throw new DbApiException("Ошибка выполнения запроса данных", exception);
            }
        } catch (DbApiException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new DbApiException("Неожиданная ошибка", exception);
        }
    }

    private JsonNode toResponse(PGobject body) throws JsonProcessingException {
        String respBody = Optional.ofNullable(body)
                .map(PGobject::getValue).orElse(null);
        return toJson(respBody);
    }


    private PreparedStatement prepareLogEvent(Connection connection, Long userId, EventType eventType, String message) throws SQLException {
        PreparedStatement ret = connection.prepareStatement("CALL public.log_event(?, ?, ?)");
        ret.setObject(1, userId);
        ret.setObject(2, eventType.getValue());
        ret.setObject(3, message);
        return ret;
    }


    private PreparedStatement prepareBalance(Connection connection, Long userId) throws SQLException {
        PreparedStatement ret = connection.prepareStatement("SELECT public.balance(?)");
        ret.setObject(1, userId);
        return ret;
    }

    private JsonNode toJson(String value) throws JsonProcessingException {
        return StringUtils.isNotBlank(value)
                ? objectMapper.readTree(value)
                : null;
    }

    public static class DbApiException extends RuntimeException {

        public DbApiException(String message) {
            super(message);
        }
        public DbApiException(String message, Throwable cause) {
            super(message, cause);
        }
    }

}
