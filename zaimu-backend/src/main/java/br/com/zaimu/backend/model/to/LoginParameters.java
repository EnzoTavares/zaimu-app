package br.com.zaimu.backend.model.to;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginParameters {

//    @NotBlank(message = "O e-mail é obrigatório")
//    @Email(message = "O email deve ser válido.")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    private String password;
}
