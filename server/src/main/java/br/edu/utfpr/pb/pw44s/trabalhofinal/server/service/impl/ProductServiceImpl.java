package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Product;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.IProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl extends CrudServiceImpl<Product, Long> implements IProductService {
    private final ProductRepository productRepository;
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    protected JpaRepository<Product, Long> getRepository() {
        return this.productRepository;
    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        List<Product> list = productRepository.findProductsByCategory_Id(categoryId);
        return list;
    }
}
