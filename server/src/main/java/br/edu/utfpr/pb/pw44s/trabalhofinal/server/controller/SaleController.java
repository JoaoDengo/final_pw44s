package br.edu.utfpr.pb.pw44s.trabalhofinal.server.controller;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.SaleDTO;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Sale;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ISaleService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("sales")
public class SaleController extends CrudController<Sale, SaleDTO, Long> {

    private final ISaleService saleService;
    private final ModelMapper modelMapper;

    public SaleController(ISaleService saleService, ModelMapper modelMapper) {
        super(Sale.class, SaleDTO.class);
        this.saleService = saleService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Sale, Long> getService() {
        return saleService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @PostMapping
    @Override
    public ResponseEntity<SaleDTO> create(@RequestBody @Valid SaleDTO saleDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Sale sale = modelMapper.map(saleDTO, Sale.class);
        sale.setUser(user);
        System.out.println(saleDTO.toString());
        saleService.save(sale);

        return ResponseEntity.status(HttpStatus.CREATED).body(saleDTO);
    }


    @GetMapping("/user")
    public ResponseEntity<List<SaleDTO>> getSalesForAuthenticatedUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Sale> sales = saleService.findByUser(user);

        List<SaleDTO> saleDTOs = sales.stream()
                .map(sale -> modelMapper.map(sale, SaleDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(saleDTOs);
    }

}

