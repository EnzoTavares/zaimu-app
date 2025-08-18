package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.controller.enums.HttpStatusEnum;
import br.com.zaimu.backend.model.exception.ValidationExceptionHandler;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        Integer reponseStatus;
        Object response;
        try{
            response = authService.signUpUser(registerParameters);
            reponseStatus = HttpStatusEnum.success();

        } catch (ValidationExceptionHandler e) {
            response = e.getMessage();
            reponseStatus = HttpStatusEnum.fail();
        }
        return new HttpResponse(reponseStatus, response);
    }

    @PostMapping("/confirm-email/{nickname}/{code}")
    public HttpResponse confirmEmail(
            @PathVariable String nickname,
            @PathVariable String code
    ) {
        Integer reponseStatus;
        Object response;
        try{
            authService.confirmEmail(nickname, code);
            response = "Email confirmed successfully.";
            reponseStatus = HttpStatusEnum.success();
        } catch (ValidationExceptionHandler e) {
            response = e.getMessage();
            reponseStatus = HttpStatusEnum.fail();
        }
        return new HttpResponse(reponseStatus, response);
    }
}
