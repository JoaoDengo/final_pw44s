package br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Brand;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    private Double price;

    @NotNull
    private String img;

    @NotNull
    private String img2;

    @NotNull
    private String img3;

    @NotNull
    private String conection_type;

    @NotNull
    private String size;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;
}
