package br.edu.utfpr.pb.pw44s.trabalhofinal.server;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.SaleRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.UserRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {
    private static final String API_USERS = "/users";

    @Autowired
    UserRepository userRepository;

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private SaleRepository saleRepository;

    @BeforeEach
    public void cleanUp() {
        saleRepository.deleteAll();
        addressRepository.deleteAll();
        userRepository.deleteAll();
        restTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void testCreateUser() {
        User user = createValidUser();

        ResponseEntity<Object> response = restTemplate.postForEntity(API_USERS, user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void testCreateUser_passwordIsEncrypted() {
        User user = createValidUser();

        testRestTemplate.postForEntity(API_USERS, user, GenericResponse.class);
        List<User> users = userRepository.findAll();
        User userDB = users.get(0);

        assertThat(userDB.getPassword()).isNotEqualTo(user.getPassword());
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase(){
        User user = createValidUser();

        ResponseEntity<Object> response = restTemplate.postForEntity(API_USERS, user, Object.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }


    private User createValidUser() {
        User user = new User();
        user.setFirstName("test-Firstname");
        user.setLastName("test-Lastname");
        user.setEmail("test-email@example.com");
        user.setPassword("P4ssword");
        user.setCpf("152.845.849-45");

        return user;
    }
}
