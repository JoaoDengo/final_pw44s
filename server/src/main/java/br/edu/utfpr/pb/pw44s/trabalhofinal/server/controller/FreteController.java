package br.edu.utfpr.pb.pw44s.trabalhofinal.server.controller;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl.FreteServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/frete")
public class FreteController {

    private final FreteServiceImpl freteService;


    public FreteController(FreteServiceImpl freteService) {
        this.freteService = freteService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<?> calcularFrete(@PathVariable String cep) {
        Double frete = freteService.calcularFretePorCep(cep);
        if (frete == null) {
            return ResponseEntity.badRequest().body("CEP inválido ou não encontrado");
        }
        return ResponseEntity.ok(frete);
    }
}
