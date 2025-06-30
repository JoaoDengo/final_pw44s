                                                                package br.edu.utfpr.pb.pw44s.trabalhofinal.server.controller;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.BrandDTO;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Brand;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.IBrandService;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ICrudService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("brands")
public class BrandController extends CrudController<Brand, BrandDTO, Long> {
    private final IBrandService brandService;
    private final ModelMapper modelMapper;

    public BrandController(IBrandService brandService, ModelMapper modelMapper) {
         super(Brand.class, BrandDTO.class);
         this.brandService = brandService;
         this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Brand, Long> getService() {
        return this.brandService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }
}
