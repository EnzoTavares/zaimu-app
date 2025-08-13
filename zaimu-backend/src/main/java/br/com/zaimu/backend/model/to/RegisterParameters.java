package br.com.zaimu.backend.model.to;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterParameters {

    @NotBlank(message = "O nome é obrigatório")
    private String name;

    @NotBlank(message = "O username é obrigatório")
    private String username;

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "O email deve ser válido")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[@#$%^&+=!])(?=\\\\S+$).{8,16}$",
            message = "A senha deve conter entre 8 e 16 caracteres, incluindo um número e um caractere especial"
    )
    private String password;
}
