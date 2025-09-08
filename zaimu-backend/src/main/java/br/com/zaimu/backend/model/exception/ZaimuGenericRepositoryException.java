package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ZaimuGenericRepositoryException extends RuntimeException {
    public ZaimuGenericRepositoryException(String message) {
        super(message);
    }

    public ZaimuGenericRepositoryException(String message, Exception e) {
    super(message);
  }
}
