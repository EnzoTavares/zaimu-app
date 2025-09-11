package br.com.zaimu.backend.model.exception;

import br.com.zaimu.backend.controller.enums.HttpStatusEnum;
import br.com.zaimu.backend.model.to.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import software.amazon.awssdk.services.cognitoidentityprovider.model.TooManyRequestsException;

import javax.naming.LimitExceededException;

@ControllerAdvice
public class ZaimuApiExceptionHandler extends RuntimeException {

    private static final Logger logger = LoggerFactory.getLogger(ZaimuApiExceptionHandler.class);

    @ExceptionHandler(LimitExceededException.class)
    public ResponseEntity<HttpResponse> handleTooManyRequests(LimitExceededException ex) {
      HttpResponse errorResponse = new HttpResponse(
              HttpStatusEnum.fail(),
              "Limite de requisições excedido. Tente novamente mais tarde."
      );
      return new ResponseEntity<>(errorResponse, HttpStatus.TOO_MANY_REQUESTS);
    }

  @ExceptionHandler(TooManyRequestsException.class)
  public ResponseEntity<HttpResponse> handleTooManyRequests(TooManyRequestsException ex) {
    HttpResponse errorResponse = new HttpResponse(
            HttpStatusEnum.fail(),
            "Limite de requisições excedido. Tente novamente mais tarde."
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.TOO_MANY_REQUESTS);
  }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<HttpResponse> handleGenericException(Exception ex) {
      logger.error(ex.getMessage());
      HttpResponse errorResponse = new HttpResponse(
              HttpStatusEnum.fail(),
              "Ocorreu um erro inesperado no servidor. Tente novamente mais tarde."
      );
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
