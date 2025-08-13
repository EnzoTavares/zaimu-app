package br.com.zaimu.backend.service;

import br.com.zaimu.backend.model.to.RegisterParameters;

public interface RegisterService {
    void registerUser (RegisterParameters registerParameters);
}
