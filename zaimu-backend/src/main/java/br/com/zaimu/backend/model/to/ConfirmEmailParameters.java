package br.com.zaimu.backend.model.to;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmEmailParameters {

    private String uuid;

    private String email;

    private String givenName;

    private String familyName;

    private String nickname;

    private String password;
}
