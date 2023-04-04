package ru.itone.ilp.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.io.Serializable;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Table(name = "refresh_tokens", uniqueConstraints = {
        @UniqueConstraint(columnNames = "token")
})
@NoArgsConstructor
@Setter
@Getter
@ToString
@Accessors(chain = true)
public class RefreshToken implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false, length = 40, unique = true)
    private String token;

    @Column(name="expiry_ts", nullable = false)
    private Instant expiryTs;

}
