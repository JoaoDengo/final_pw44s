package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Address;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.repository.SaleRepository;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.IAddressService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl extends CrudServiceImpl<Address, Long> implements IAddressService {
    private final AddressRepository addressRepository;
    private final SaleRepository saleRepository;

    public AddressServiceImpl(AddressRepository addressRepository, SaleRepository saleRepository) {
        this.addressRepository = addressRepository;
        this.saleRepository = saleRepository;
    }

    @Override
    protected JpaRepository<Address, Long> getRepository() {
        return this.addressRepository;
    }

    @Override
    public List<Address> findByUser(User user){
        return addressRepository.findByUserId(user.getId());
    }
}
