package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.security.LoginResponseView;
import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.model.to.RegisterParameters;

public interface AuthService {
    RequestUser signUpUser (RegisterParameters registerParameters);

    LoginResponseView signInUser (LoginParameters registerParameters);

    void confirmEmail (String nickname, String code);

    String resetPassword (String credential, String code, String newPassword);

    void resendSignUpCode (String nickname);
}
