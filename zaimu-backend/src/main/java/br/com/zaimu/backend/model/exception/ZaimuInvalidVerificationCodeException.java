package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ZaimuInvalidVerificationCodeException extends RuntimeException {

    public ZaimuInvalidVerificationCodeException(String message) {
        super(message);
    }

    public ZaimuInvalidVerificationCodeException(String message, Exception e) {
    super(message);
  }
}