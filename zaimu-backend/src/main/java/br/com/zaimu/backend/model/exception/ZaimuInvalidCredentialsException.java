package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import software.amazon.awssdk.services.cognitoidentityprovider.model.NotAuthorizedException;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ZaimuInvalidCredentialsException extends RuntimeException {

    public ZaimuInvalidCredentialsException(String message) {
        super(message);
    }

    public ZaimuInvalidCredentialsException(String message, Exception e) {
        super(message);
    }
}
