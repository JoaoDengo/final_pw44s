package br.edu.utfpr.pb.pw44s.trabalhofinal.server.controller;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.AddressDTO;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Address;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.IAddressService;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ICrudService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("addresses")
public class AddressController extends CrudController<Address, AddressDTO, Long> {
    private final IAddressService addressService;
    private final ModelMapper modelMapper;

    public AddressController(IAddressService addressService, ModelMapper modelMapper) {
        super(Address.class, AddressDTO.class);
        this.addressService = addressService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    @Override
    public ResponseEntity<AddressDTO> create(@RequestBody @Valid AddressDTO addressDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Address address = modelMapper.map(addressDTO, Address.class);
        address.setUser(user);
        addressService.save(address);

        return ResponseEntity.status(HttpStatus.CREATED).body(addressDTO);
    }

    @GetMapping("/user")
    public ResponseEntity<List<AddressDTO>> getAddressForAuthenticatedUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Address> addresses = addressService.findByUser(user);

        List<AddressDTO> addressDTOS = addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(addressDTOS);
    }

    @Override
    protected ICrudService<Address, Long> getService() {
        return this.addressService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }
}
