package br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.impl;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.ViaCepDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class CepServiceImpl {

    private final RestTemplate restTemplate = new RestTemplate();

    public ViaCepDTO buscarPorCep(String cep) {
        try {
            String url = "https://viacep.com.br/ws/" + cep + "/json/";
            ViaCepDTO response = restTemplate.getForObject(url, ViaCepDTO.class);

            if (response == null) {
                return null;
            }

            if (Boolean.TRUE.equals(response.getErro())) {
                return null;
            }

            return response;

        } catch (RestClientException e) {
            return null;
        }
    }
}

