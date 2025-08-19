package br.com.zaimu.backend.model.to;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginParameters {

    @Email(message = "O email deve ser válido.")
    private String email;

    private String username;

    @NotBlank(message = "A senha é obrigatória")
    private String password;

    public void isValid() {
        if ((email == null || email.isBlank()) && (username == null || username.isBlank())) {
            throw new IllegalArgumentException("Informe o email ou o username para login.");
        }
        if((email != null && !email.isBlank()) && (username != null && !username.isBlank())) {
            throw new IllegalArgumentException("Informe apenas o email ou o username.");
        }
    }
}
