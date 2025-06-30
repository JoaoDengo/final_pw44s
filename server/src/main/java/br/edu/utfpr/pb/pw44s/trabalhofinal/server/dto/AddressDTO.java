package br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
    private Long id;

    @NotNull
    private String street;

    @NotNull
    private Integer number;

    @NotNull
    @Pattern(regexp = "\\d{5}-\\d{3}", message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.cep}")
    @NotNull
    private String cep;

    @NotNull
    private String city;

}
