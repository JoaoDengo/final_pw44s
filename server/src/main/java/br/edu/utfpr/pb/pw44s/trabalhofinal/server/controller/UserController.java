package br.edu.utfpr.pb.pw44s.trabalhofinal.server.controller;

import br.edu.utfpr.pb.pw44s.trabalhofinal.server.dto.UserDTO;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.model.User;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.trabalhofinal.server.service.IUserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UserController extends CrudController<User, UserDTO, Long> {

    private final IUserService userService;
    private final ModelMapper modelMapper;

    public UserController(IUserService userService, ModelMapper modelMapper) {
        super(User.class, UserDTO.class);
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    @Override
    public ResponseEntity<UserDTO> create(@RequestBody @Valid UserDTO userDTO) {
        userService.save(modelMapper.map(userDTO, User.class));
        userDTO.setCpf(null);
        userDTO.setPassword(null);

        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @Override
    protected ICrudService<User, Long> getService() {
        return userService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
