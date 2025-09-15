package br.com.zaimu.backend.model.to;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LoginParameters {
    private String email;

    private String nickname;

    private String password;

    public void isValid() {
        if ((email == null || email.isBlank()) && (nickname == null || nickname.isBlank())) {
            throw new IllegalArgumentException("Informe o email ou o nickname para login.");
        }
        if((email != null && !email.isBlank()) && (nickname != null && !nickname.isBlank())) {
            throw new IllegalArgumentException("Informe apenas o email ou o nickname.");
        }
    }
}
