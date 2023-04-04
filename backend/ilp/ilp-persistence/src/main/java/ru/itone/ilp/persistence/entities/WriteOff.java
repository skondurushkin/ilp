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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import ru.itone.ilp.persistence.types.OrderStatus;
import ru.itone.ilp.persistence.types.OrderStatusEnumType;

@Setter
@Getter
@ToString
@Accessors(chain = true)
@Entity
@Table(name = "write_offs")
@NoArgsConstructor

@TypeDef(name = "order_status", typeClass = OrderStatusEnumType.class)
public class WriteOff implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "article_id", referencedColumnName = "id", nullable = false)
    private Article article;

    private LocalDate date;

    @NotNull
    @Min(1)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @ColumnDefault("created")
    @Type(OrderStatusEnumType.class)
    @Column(name = "status", nullable = false)
    private OrderStatus orderStatus;

}
