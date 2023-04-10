package ru.itone.ilp.persistence.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum OrderStatus {
    created("создан"),
    processing("формируется"),
    delivering("ожидает выдачи"),
    completed("выдан"),
    cancelled("отменен");

    @Getter
    private final String localizedName;
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
