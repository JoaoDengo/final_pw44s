package br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

}
