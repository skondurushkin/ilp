package ru.itone.ilp.server.misc;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.GrantedAuthority;
import ru.itone.ilp.services.jwt.UserDetailsImpl;

@UtilityClass
public class Helpers {
    public boolean isAdmin(UserDetailsImpl user) {
        return user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch("ADMIN"::equalsIgnoreCase);
    }

}
