package ru.itone.ilp.common;

import java.time.LocalDate;
import java.util.StringJoiner;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.Name;

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

    public String trimSearchKey(String searchKey, int min, int max) {
        searchKey = StringUtils.trimToEmpty(searchKey);
        if (searchKey.length() < min)
            return StringUtils.EMPTY;
        return StringUtils.substring(searchKey, 0, Math.min(searchKey.length(), max));
    }
}
