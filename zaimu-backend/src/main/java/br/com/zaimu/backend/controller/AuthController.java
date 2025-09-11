package br.com.zaimu.backend.controller;

import br.com.zaimu.backend.controller.enums.HttpStatusEnum;
import br.com.zaimu.backend.model.security.LoginResponseView;
import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.ConfirmEmailParameters;
import br.com.zaimu.backend.model.to.HttpResponse;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
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
        try{
            RequestUser requestUser = authService.signUpUser(registerParameters);
            return new HttpResponse(HttpStatusEnum.success(), requestUser);
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @PostMapping("/login")
    public HttpResponse login(
            @Valid @RequestBody LoginParameters loginParameters
    ) {
        try{
            LoginResponseView loginResponseView = authService.signInUser(loginParameters);
            return new HttpResponse(HttpStatusEnum.success(), loginResponseView);
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @PostMapping("/confirm-email/{code}")
    public HttpResponse confirmEmail(
            @RequestBody ConfirmEmailParameters confirmEmailParameters,
            @PathVariable String code
    ) {
        try{
            LoginResponseView loginResponseView = authService.confirmEmailAndSignIn(confirmEmailParameters, code);
            return new HttpResponse(HttpStatusEnum.success(), loginResponseView);
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @PostMapping("/reset-password/{credential}")
    public HttpResponse resetPassword(
            @PathVariable String credential,
            @RequestParam (required = false) String code,
            @RequestParam (required = false) String newPassword
    ) {
        try{
            authService.resetPassword(credential, code, newPassword);
            return new HttpResponse(HttpStatusEnum.success(), "Código enviado para redefinição de senha.");
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @PostMapping("/resend-code/{nickname}")
    public HttpResponse resendCode(
            @PathVariable String nickname
    ) {
        try{
            authService.resendSignUpCode(nickname);
            return new HttpResponse(HttpStatusEnum.success(), "Código reenviado.");
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }

    @DeleteMapping("/delete-request-user/{nickname}/{uuid}")
    public HttpResponse deleteRequestUser (
            @PathVariable String nickname,
            @PathVariable String uuid
    ) {
        try {
            String response = authService.deleteRequestUser(nickname, uuid);
            return new HttpResponse(HttpStatusEnum.success(), response);
        } catch (Exception e) {
            return new HttpResponse(HttpStatusEnum.fail(), e.getMessage());
        }
    }
}
