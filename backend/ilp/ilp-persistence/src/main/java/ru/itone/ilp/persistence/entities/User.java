package ru.itone.ilp.persistence.entities;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.TypeDef;
import ru.itone.ilp.openapi.common.ApiHelper;
import ru.itone.ilp.openapi.model.Name;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        })

@Accessors(chain = true)
@Setter
@Getter
@NoArgsConstructor
@TypeDef(name = "jsonb", typeClass = JsonStringType.class)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 30)
    @Column(name = "first_name", length = 30, nullable = false)
    private String firstName;

    @Size(max = 40)
    @Column(name = "middle_name", length=40)
    private String middleName;

    @NotBlank
    @Size(max = 50)
    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @NotBlank
    @Size(max = 100)
    @Email
    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @NotBlank
    @Size(max = 255)
    @Column(name="password", nullable = false)
    private String password;

    @Size(max = 512)
    @Column(name="avatar_url", length=512)
    private String avatarUrl;

    @Column(name="start_date", nullable = false, columnDefinition = "date default now()")
    private LocalDate startDate = LocalDate.now();

    @Column(name="end_date", nullable = false, columnDefinition = "date default '3000-01-01'")
    private LocalDate endDate = ApiHelper.virtualDate;

    @Column(columnDefinition = "jsonb")
    private String extension;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @Transient
    public boolean isActive() {
        return Instant.now().compareTo(Instant.from(endDate)) <= 0;
    }

    public User(Name name, String email, String password) {
        this.firstName = name.getFirstName();
        this.middleName = name.getMiddleName();
        this.lastName = name.getLastName();
        this.email = email;
        this.password = password;
    }

    public Name toName() {
        return new Name()
                .firstName(firstName)
                .middleName(middleName)
                .lastName(lastName);
    }


}
