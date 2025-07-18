package br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByUserId(Long userId);
}
