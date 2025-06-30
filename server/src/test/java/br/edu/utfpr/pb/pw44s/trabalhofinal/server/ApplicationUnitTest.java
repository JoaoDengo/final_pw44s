package br.edu.utfpr.pb.pw44s.trabalhofinal.server;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.security.SecurityConstants;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.security.dto.AuthorityResponseDTO;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.security.dto.UserResponseDTO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class ApplicationUnitTest {

    @Test
    public void testUserResponseDTOConstructor() {
        User user = new User();
        user.setFirstName("Joao");
        user.setLastName("Dengo");
        user.setEmail("joao@gmail.com");

        UserResponseDTO dto = new UserResponseDTO(user);

        assertEquals("Joao Dengo", dto.getDisplayName());
        assertEquals("joao@gmail.com", dto.getUsername());
        assertEquals(1, dto.getAuthorities().size());

        AuthorityResponseDTO authority = dto.getAuthorities().iterator().next();
        assertEquals("ROLE_USER", authority.getAuthority());
    }

    @Test
    public void testJWTTokenGeneration() {
        String username = "joao";
        Date expiration = new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME);

        String token = JWT.create()
                .withSubject(username)
                .withExpiresAt(expiration)
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET));

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    public void testAuthorityResponseDTO() {
        AuthorityResponseDTO dto = new AuthorityResponseDTO("ROLE_USER");

        assertEquals("ROLE_USER", dto.getAuthority());
    }
}
