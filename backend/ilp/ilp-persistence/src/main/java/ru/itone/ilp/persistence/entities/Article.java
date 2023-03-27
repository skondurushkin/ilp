package ru.itone.ilp.persistence.entities;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "articles", uniqueConstraints = {
        @UniqueConstraint(columnNames = "code")
})
@Setter
@Getter
@Accessors(chain = true)
@NoArgsConstructor
public class Article implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max=20)
    @Column(length = 20, nullable = false, unique = true)
    private String code;

    @Size(max= 50)
    @NotBlank
    @Column(length = 50, nullable = false)
    private String name;

    @Size(max= 500)
    @Column(length = 500)
    private String description;

    @Min(1)
    @Column
    private Integer price;

    @Size(max = 512)
    @Column(name="image_link", length = 512)
    private String imageLink;

    private Boolean available;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private ObjectNode extension;
}
