package ru.itone.ilp.common;

import lombok.experimental.UtilityClass;
import org.springframework.util.StringUtils;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.Name;

import java.time.LocalDate;
import java.util.StringJoiner;

@UtilityClass
public class ApiHelper {

    public static final LocalDate virtualDate;

    static {
        virtualDate = LocalDate.of(3000, 1, 1);
    }

    public String fullName(Name name) {
        return new StringJoiner(" ")
                .add(name.getFirstName())
                .add(name.getMiddleName())
                .add(name.getLastName())
                .toString();
    }

    public ERole toERole(String role) {
        if (StringUtils.startsWithIgnoreCase(role, "ROLE_")) {
            role = role.substring(5);
        }
        return ERole.fromValue(role);
    }
}
