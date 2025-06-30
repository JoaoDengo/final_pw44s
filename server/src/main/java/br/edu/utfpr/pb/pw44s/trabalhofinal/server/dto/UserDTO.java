package br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.validator.constraints.br.CPF;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    @NotNull
    @Size(min = 3, max = 20, message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.firstName.size}")
    private String firstName;

    @NotNull
    @Size(min = 3, max = 20, message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.lastName.size}")
    private String lastName;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.email}")
    private String email;

    @NotNull
    @Size(min = 5, max = 20, message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.password.size}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.password}")
    private String password;

    @CPF( message = "{br.edu.utfpr.pb.pw44s.trabalho1.server.cpf}")
    private String cpf;


}
