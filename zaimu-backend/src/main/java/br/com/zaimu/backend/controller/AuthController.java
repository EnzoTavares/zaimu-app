package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    /**
     * Endpoint to register a new user.
     *
     * @param registerParameters the parameters for registration
     * @return HttpResponse containing the status and user information
     */
    @PostMapping("/register")
    public HttpResponse register(
            @Valid @RequestBody RegisterParameters registerParameters
    ) {
        RequestUser requestUser = authService.registerUser(registerParameters);
        authService.registerUser(registerParameters);

        return new HttpResponse(0, requestUser);
    }
}
