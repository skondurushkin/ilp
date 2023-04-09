package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import ru.itone.ilp.persistence.types.OperationType;
import ru.itone.ilp.persistence.types.OperationTypeEnumType;

@Entity
@Table(name = "operations")
@Setter
@Getter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
@TypeDef(name = "operation_type", typeClass = OperationTypeEnumType.class)
public class Operation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Type(OperationTypeEnumType.class)
    @Column(name = "type", nullable = false)
    private OperationType type;

    @Column
    Instant instant;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "accrual_id", referencedColumnName = "id", nullable = false)
    private Accrual accrual;

    @OneToOne
    @JoinColumn(name = "writeoff_id", referencedColumnName = "id", nullable = false)
    private WriteOff writeOff;

    @Column(length = 50)
    private String name;

    @Column
    private Integer amount;

    @Column
    private Boolean active;

}
