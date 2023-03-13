package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "settings")
@Data
public class Settings {

    @Id
    @Column(name = "PROP_KEY", length = 100)
    String  key;

    @Column(name = "PROP_VALUE", length = 1000)
    String value;
}
