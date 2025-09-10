package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ZaimuTokenException extends RuntimeException {

    public ZaimuTokenException(String message) {
        super(message);
    }

    public ZaimuTokenException(String message, Exception e) {
    super(message);
  }
}
