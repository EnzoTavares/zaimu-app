package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import software.amazon.awssdk.services.cognitoidentityprovider.model.UsernameExistsException;

@ResponseStatus(HttpStatus.CONFLICT)
public class ZaimuUserAlreadyExistsException extends RuntimeException {

  public ZaimuUserAlreadyExistsException(String message) {super(message);}

  public ZaimuUserAlreadyExistsException(String message, Exception e) {super(message);}
}
