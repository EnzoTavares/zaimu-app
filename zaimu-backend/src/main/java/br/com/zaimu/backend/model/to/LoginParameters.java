package br.com.zaimu.backend.model.to;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginParameters {

    @Email(message = "O email deve ser válido.")
    private String email;

    private String nickname;

    @NotBlank(message = "A senha é obrigatória")
    private String password;
}
