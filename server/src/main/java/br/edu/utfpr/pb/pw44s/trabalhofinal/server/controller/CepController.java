package br.edu.utfpr.pb.pw44s.trabalhofinal.server.controller;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.ViaCepDTO;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl.CepServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cep")
public class CepController {

    private final CepServiceImpl cepService;

    public CepController(CepServiceImpl cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<?> buscarCep(@PathVariable String cep) {
        System.out.println("Requisição recebida para CEP: " + cep);

        ViaCepDTO response = cepService.buscarPorCep(cep);
        if (response == null) {
            return ResponseEntity
                    .badRequest()
                    .body("CEP inválido ou não encontrado");
        }
        return ResponseEntity.ok(response);
    }


}
