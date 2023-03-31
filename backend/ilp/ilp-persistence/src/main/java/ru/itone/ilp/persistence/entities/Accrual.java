package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Setter
@Getter
@ToString
@Accessors(chain = true)
@Entity
@Table(name = "accruals")
@NoArgsConstructor
public class Accrual implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "activity_id", referencedColumnName = "id", nullable = false)
    private Activity activity;

    @NotNull
    @Column(name="date", nullable = false)
    private LocalDate date;

    @NotNull
    @Min(1)
    @Column(name = "amount", nullable = false)
    private Integer amount;

}
