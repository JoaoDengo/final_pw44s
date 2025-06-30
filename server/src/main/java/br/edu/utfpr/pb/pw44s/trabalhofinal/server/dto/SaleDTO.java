package br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.enums.PaymentMethod;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Address;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.ItemSale;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleDTO {
    private Long id;
    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentMethod payment_method;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSale> saleItems;

    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private LocalDateTime saleDate;

    private Double total;

}
