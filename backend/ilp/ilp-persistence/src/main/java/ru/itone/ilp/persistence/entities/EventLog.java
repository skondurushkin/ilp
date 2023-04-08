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
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import ru.itone.ilp.persistence.types.EventType;
import ru.itone.ilp.persistence.types.EventTypeEnumType;

@Entity
@Table(name = "event_log")
@Setter
@Getter
@ToString
@Accessors(chain = true)
@NoArgsConstructor
@TypeDef(name = "event_type", typeClass = EventTypeEnumType.class)
public class EventLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Type(EventTypeEnumType.class)
    @Column(name = "ev_type", nullable = false)
    EventType type;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column
    Instant instant;

    @NotNull
    @Column(name = "ev_info")
    String evInfo;
}
