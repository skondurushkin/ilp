package ru.itone.ilp.persistence.entities;

import static ru.itone.ilp.common.ApiHelper.virtualDate;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;

@Setter
@Getter
@ToString
@Accessors(chain = true)
@Entity
@Table(name = "activities", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
@NoArgsConstructor
public class Activity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max= 50)
    @NotBlank
    @Column(length = 50, nullable = false, unique = true)
    private String name;

    @Size(max= 500)
    @Column(length = 500)
    private String description;

    @Min(1)
    @Column
    private Integer price;

    @Column(nullable = false, columnDefinition = "date default '3000-01-01'")
    private LocalDate startDate = virtualDate;

    @Column(nullable = false, columnDefinition = "date default '3000-01-01'")
    private LocalDate endDate = virtualDate;

    @Column(name="info_link")
    private String infoLink;

    @Column(columnDefinition = "jsonb")
    @Type(JsonType.class)
    private ObjectNode extension;

}
