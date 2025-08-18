package br.com.zaimu.backend.model.to;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Setter
@Getter
public class RegisterParameters {

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "O email deve ser válido")
    private String email;

    @NotBlank(message = "O primeiro nome é obrigatório")
    private String givenName;

    @NotBlank(message = "O último nome é obrigatório")
    private String familyName;

    @NotBlank(message = "O nickname é obrigatório")
    private String nickname;

    @NotBlank(message = "A senha é obrigatória")
    @Pattern(
            regexp = "^(?!^ |.* $)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\^\\$\\*\\.\\[\\]\\{\\}\\(\\)\\?\\-!\"@#%&/\\\\,><' ;:|~`_+=]).{8,}$",
            message = "A senha deve conter pelo menos 8 caracteres, incluindo um número, uma letra minúscula, uma letra maiúscula e um caractere especial. Não pode conter espaços no início ou no fim."
    )
    private String password;
}
