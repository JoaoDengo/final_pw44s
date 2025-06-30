package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.ViaCepDTO;
import org.springframework.stereotype.Service;

@Service
public class FreteServiceImpl {
    private final CepServiceImpl cepService;
    public FreteServiceImpl(CepServiceImpl cepService) {
        this.cepService = cepService;
    }

    public double calcularFretePorCep(String cep) {
        ViaCepDTO endereco = cepService.buscarPorCep(cep);
        if (endereco == null) {
            throw new IllegalArgumentException("CEP inválido");
        }
        String uf = endereco.getUf();

        switch (uf) {
            case "AC": case "AP": case "AM": case "PA": case "RO": case "RR": case "TO":
                return 30.0;
            case "AL": case "BA": case "CE": case "MA": case "PB": case "PE": case "PI": case "RN": case "SE":
                return 25.0;
            case "DF": case "GO": case "MT": case "MS":
                return 20.0;
            case "ES": case "RJ": case "SP": case "MG":
                return 15.0;
            case "PR": case "RS": case "SC":
                return 10.0;
            default:
                return 50.0;
        }
    }
}
