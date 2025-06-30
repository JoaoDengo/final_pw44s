package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Brand;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.BrandRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.IBrandService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class BrandServiceImpl extends CrudServiceImpl<Brand, Long> implements IBrandService {
    private final BrandRepository brandRepository;
    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    protected JpaRepository<Brand, Long> getRepository() {
        return this.brandRepository;
    }
}
