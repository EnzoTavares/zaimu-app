package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.security.LoginResponseView;
import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.ConfirmEmailParameters;
import br.com.zaimu.backend.model.to.LoginParameters;
import br.com.zaimu.backend.model.to.RegisterParameters;

public interface AuthService {
    RequestUser signUpUser (RegisterParameters registerParameters);

    LoginResponseView signInUser (LoginParameters registerParameters);

    LoginResponseView confirmEmailAndSignIn (
            ConfirmEmailParameters confirmEmailParameters, String code
    );

    void resetPassword (String credential, String code, String newPassword);

    void resendSignUpCode (String nickname);

    String deleteRequestUser(String nickname, String uuid) throws Exception;
}
