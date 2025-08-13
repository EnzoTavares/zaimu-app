package br.com.zaimu.backend.model.to;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterParameters {
    private String name;
    private String username;
    private String email;
    private String password;
}
