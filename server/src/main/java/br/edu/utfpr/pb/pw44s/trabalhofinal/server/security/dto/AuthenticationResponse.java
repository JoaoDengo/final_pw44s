package br.edu.utfpr.pb.pw44s.trabalhofinal.server.security.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    private String token;
    private UserResponseDTO user;
}
