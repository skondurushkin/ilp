package ru.itone.ilp.openapi.common;

import java.util.Optional;
import java.util.StringJoiner;
import lombok.experimental.UtilityClass;
import org.springframework.util.StringUtils;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.Name;

@UtilityClass
public class ApiHelper {

    public String fullName(Name name) {
        return new StringJoiner(" ")
                .add(name.getFirstName())
                .add(name.getMiddleName())
                .add(name.getLastName())
                .toString();
    }

    public String toRoleName(ERole role) {
        return Optional.ofNullable(role).map(e -> "ROLE_" + e.getValue()).orElse(null);
    }

    public ERole toERole(String role) {
        if (StringUtils.startsWithIgnoreCase(role, "ROLE_")) {
            role = role.substring(5);
        }
        return ERole.fromValue(role);
    }
}
