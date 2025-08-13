package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.service.RegisterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Date;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    RegisterService registerService;

    /**
     * Endpoint to register a new user.
     *
     * @param registerParameters the parameters for registration
     * @return HttpResponse containing the status and user information
     */
    @PostMapping
    public HttpResponse register(
            @Valid @RequestBody RegisterParameters registerParameters
    ) {
        RequestUser requestUser = registerService.registerUser(registerParameters);
        registerService.registerUser(registerParameters);

        return new HttpResponse(0, requestUser);
    }
}
