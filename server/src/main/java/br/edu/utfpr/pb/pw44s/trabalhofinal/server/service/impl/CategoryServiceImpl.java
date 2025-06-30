package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Category;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.CategoryRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ICategoryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl extends CrudServiceImpl<Category, Long> implements ICategoryService {
    private final CategoryRepository categoryRepository;
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    protected JpaRepository<Category, Long> getRepository() {
        return this.categoryRepository;
    }
}
