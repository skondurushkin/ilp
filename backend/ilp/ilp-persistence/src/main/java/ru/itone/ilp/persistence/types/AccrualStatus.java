package ru.itone.ilp.persistence.types;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum AccrualStatus {
    created,
    cancelled;

    @Override
    public String toString() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static AccrualStatus fromJsonValue(String text) {
        for (AccrualStatus value : AccrualStatus.values()) {
            if (value.name().equalsIgnoreCase(text)) {
                return value;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + text + "'");
    }

}
