package br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
