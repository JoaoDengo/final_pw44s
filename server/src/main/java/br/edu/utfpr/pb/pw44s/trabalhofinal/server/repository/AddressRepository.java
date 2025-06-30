package br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserId(Long userId);
}
