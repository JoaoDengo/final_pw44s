package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.*;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.SaleRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ISaleService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleServiceImpl extends CrudServiceImpl<Sale, Long> implements ISaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final AddressRepository addressRepository;

    public SaleServiceImpl(SaleRepository saleRepository, ProductRepository productRepository, AddressRepository addressRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    protected JpaRepository<Sale, Long> getRepository() {
        return this.saleRepository;
    }

    @Override
    public Sale save(Sale sale) {

        if (sale.getSaleItems() != null) {
            for (ItemSale item : sale.getSaleItems()) {
                Product product = productRepository.findById(item.getProduct().getId())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

                item.setProduct(product);
                item.setPrice(product.getPrice());
                item.setSale(sale);
            }
        }
        if (sale.getAddress() == null || sale.getAddress().getId() == null) {
            throw new RuntimeException("Endereço da venda não informado.");
        }

        Address address = addressRepository.findById(sale.getAddress().getId())
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        sale.setAddress(address);



        double total = sale.getSaleItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getPrice())
                .sum();
        sale.setTotal(total);
        sale.setSaleDate(LocalDateTime.now());
        return saleRepository.save(sale);
    }

    @Override
    public List<Sale> findByUser(User user) {
        return saleRepository.findByUserId(user.getId());
    }


}
