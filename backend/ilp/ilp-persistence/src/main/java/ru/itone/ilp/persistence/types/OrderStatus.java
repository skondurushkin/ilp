package ru.itone.ilp.persistence.types;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum OrderStatus {
    created,
    processing,
    delivering,
    completed,
    cancelled;

    @Override
    public String toString() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static OrderStatus fromJsonValue(String text) {
        for (OrderStatus value : OrderStatus.values()) {
            if (value.name().equalsIgnoreCase(text)) {
                return value;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + text + "'");
    }

}
