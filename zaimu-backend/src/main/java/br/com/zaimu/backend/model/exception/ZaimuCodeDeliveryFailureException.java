package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ZaimuCodeDeliveryFailureException extends RuntimeException {

    public ZaimuCodeDeliveryFailureException(String message) {
        super(message);
    }

    public ZaimuCodeDeliveryFailureException(String message, Exception e) {
        super(message);
    }
}
