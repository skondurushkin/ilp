package ru.itone.ilp.persistence.entities;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.hibernate.annotations.TypeDef;

import java.io.Serializable;
import java.time.LocalDate;

import static ru.itone.ilp.openapi.common.ApiHelper.virtualDate;

@Setter
@Getter
@ToString
@Accessors(chain = true)
@Entity
@Table(name = "activities")
@NoArgsConstructor
@TypeDef(name = "jsonb", typeClass = JsonStringType.class)
public class Activity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max= 50)
    @NotBlank
    @Column(length = 100, nullable = false, unique = true)
    private String name;

    @Column(length = 500)
    private String description;

    @Min(1)
    @Column
    private Integer price;

    @NotBlank
    @Column(nullable = false, columnDefinition = "date default '3000-01-01'")
    private LocalDate startDate = virtualDate;

    @NotBlank
    @Column(nullable = false, columnDefinition = "date default '3000-01-01'")
    private LocalDate endDate = virtualDate;

    @Size(max = 512)
    @Column(name="logo_url", length = 512)
    private String logoUrl;

    @Column(columnDefinition = "jsonb default '{}'")
    private String extension;

}
