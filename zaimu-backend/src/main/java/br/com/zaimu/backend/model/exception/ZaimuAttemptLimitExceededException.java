package br.com.zaimu.backend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
public class ZaimuAttemptLimitExceededException extends RuntimeException {

    public ZaimuAttemptLimitExceededException(String message) {
        super(message);
    }

    public ZaimuAttemptLimitExceededException(String message, Exception e) {
    super(message);
}
}
