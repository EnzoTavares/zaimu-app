package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.entity.UserEntity;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GenerateJwtService jwtService;

    public UserEntity registerUser(RegisterParameters registerParameters) {
        if(userRepository.findByEmail(registerParameters.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        UserEntity user = new UserEntity();
        user.setEmail(registerParameters.getEmail());
        user.setUsername(registerParameters.getUsername());
        user.setPassword(passwordEncoder.encode(registerParameters.getPassword()));

        return userRepository.save(user);
    }

    public String authenticateUser(LoginParameters registerParameters) {
        UserEntity user = userRepository.findByEmail(registerParameters.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if(!passwordEncoder.matches(registerParameters.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        return jwtService.generateToken(user);
    }
}
