package br.com.zaimu.backend.model.to;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@JsonInclude( Include.NON_NULL )
@JsonIgnoreProperties( ignoreUnknown = true )
public class HttpResponse implements Serializable {

    private static final long serialVersionUID = -8668176334547945413L;

    private Integer status;

    private Object object;

    private String message;


    public HttpResponse( Integer status ) {
        this.status = status;
    }


    public HttpResponse( Integer status, String message ) {
        this.status = status;
        this.message = message;
    }


    public HttpResponse( Integer status, Object object ) {
        this.status = status;
        this.object = object;
    }
}
