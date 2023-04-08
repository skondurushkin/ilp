package ru.itone.ilp.persistence.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EventType {
    LOGIN("login"),
    LOGOUT("logout"),
    ACCRUAL("accrual"),
    WRITE_OFF("writeOff"),
    ERROR("error");

    @Getter
    @JsonValue
    private final String value;

    @Override
    public String toString() {
        return getValue().toLowerCase();
    }

    @JsonCreator
    public static EventType fromJsonValue(String text) {
        for (EventType value : EventType.values()) {
            if (value.getValue().equalsIgnoreCase(text)) {
                return value;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + text + "'");
    }
}
