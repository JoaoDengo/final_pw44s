package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Address;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;

import java.util.List;

public interface IAddressService extends ICrudService<Address, Long> {
    public List<Address> findByUser(User user);
}
