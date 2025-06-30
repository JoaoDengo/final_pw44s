package br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByCategory_Id(Long categoryId);
}
