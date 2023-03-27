package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "settings")
@Data
@Accessors(chain = true)
public class Settings implements Serializable {
    @NotBlank
    @Size(max = 100)
    @Id
    @Column(name = "prop_key", nullable = false, length = 100)
    String  key;

    @NotBlank
    @Column(name = "prop_value", columnDefinition = "text")
    String value;
}
