package br.com.zaimu.backend.service.impl;

import br.com.zaimu.backend.model.security.RequestUser;
import br.com.zaimu.backend.model.to.RegisterParameters;
import br.com.zaimu.backend.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    public RequestUser registerUser (RegisterParameters registerParameters) {
        RequestUser requestUser = new RequestUser();

        return requestUser;
    }

}
