package br.com.zaimu.backend.model.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class ZaimuExecutionException extends RuntimeException {
    public ZaimuExecutionException(String message) {
        super(message);
    }

    public ZaimuExecutionException(String message, Exception e) {
        super(message);
    }
}
