package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Product;

import java.util.List;

public interface IProductService extends ICrudService<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
}
