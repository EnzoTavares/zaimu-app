package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.RegisterParameters;

public interface AuthService {
    RequestUser signUpUser (RegisterParameters registerParameters);

    void confirmEmail (String nickname, String code);
}
