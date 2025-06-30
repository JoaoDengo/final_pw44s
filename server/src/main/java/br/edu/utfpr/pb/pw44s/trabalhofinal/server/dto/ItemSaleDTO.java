package br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Product;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Sale;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemSaleDTO {
    private Long id;

    @NotNull
    @Min(1)
    private int quantity;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "sale_id", referencedColumnName = "id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;
}
