package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.Sale;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;

import java.util.List;

public interface ISaleService extends ICrudService<Sale, Long> {
    List<Sale> findByUser(User user);

}
