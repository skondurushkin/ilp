package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import ru.itone.ilp.openapi.model.ERole;

@Entity
@Table(name = "roles",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "name")
        })
@Setter
@Getter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name="name", length = 20, nullable = false)
    private ERole name;


    public Role(ERole name) {
        this.name = name;
    }
}
