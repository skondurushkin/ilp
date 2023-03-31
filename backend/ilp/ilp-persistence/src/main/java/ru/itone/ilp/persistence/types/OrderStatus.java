package ru.itone.ilp.persistence.types;

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
}
