package ru.itone.ilp.persistence.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import ru.itone.ilp.openapi.model.OperationResponse.TypeEnum;

@RequiredArgsConstructor
public enum OperationType {
    accrual("accrual", TypeEnum.ACCRUAL),
    writeOff("write-off", TypeEnum.WRITEOFF);

    @Getter
    @JsonValue
    private final String name;

    @Getter
    private final TypeEnum type;

    @Override
    public String toString() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static OperationType fromJsonName(String value) {
        for (OperationType opType : OperationType.values()) {
            if (StringUtils.equalsIgnoreCase(opType.getName(), value)) {
                return opType;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

}
