package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.io.Serializable;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "settings", uniqueConstraints = {
        @UniqueConstraint(columnNames = "prop_key")
})
@Data
@Accessors(chain = true)
public class Settings implements Serializable {
    @Id
    @Column(name = "prop_key", nullable = false, length = 100)
    String  key;

    @Column(name = "prop_value", columnDefinition = "text")
    String value;
}
