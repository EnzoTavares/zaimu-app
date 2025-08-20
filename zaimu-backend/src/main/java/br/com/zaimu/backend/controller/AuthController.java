package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.controller.enums.HttpStatusEnum;
import br.com.zaimu.backend.model.exception.ValidationExceptionHandler;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

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

    @PostMapping("/login")
    public HttpResponse login(
            @Valid @RequestBody LoginParameters loginParameters
    ) {
        Integer reponseStatus;
        Object response;
        try{
            response = authService.signInUser(loginParameters);
            reponseStatus = HttpStatusEnum.success();

//            String token = response.

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

    @PostMapping("/reset-password/{credential}")
    public HttpResponse resetPassword(
            @PathVariable String credential,
            @RequestParam (required = false) String code,
            @RequestParam (required = false) String newPassword
    ) {
        Integer reponseStatus;
        Object response;
        try{
            response = authService.resetPassword(credential, code, newPassword);
            reponseStatus = HttpStatusEnum.success();
        } catch (IllegalArgumentException e) {
            response = e.getMessage();
            reponseStatus = HttpStatusEnum.fail();
        }
        return new HttpResponse(reponseStatus, response);
    }

    @PostMapping("/resend-code/{nickname}")
    public HttpResponse resendCode(
            @PathVariable String nickname
    ) {
        Integer reponseStatus;
        Object response;
        try{
            authService.resendSignUpCode(nickname);
            response = "Código reenviado.";
            reponseStatus = HttpStatusEnum.success();
        } catch (ValidationExceptionHandler e) {
            response = e.getMessage();
            reponseStatus = HttpStatusEnum.fail();
        }
        return new HttpResponse(reponseStatus, response);
    }
}
