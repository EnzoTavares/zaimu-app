package br.com.zaimu.backend.controller.enums;

public enum HttpStatusEnum {
    SUCCESS(0),
    FAIL(1);
    private final Integer status;

    HttpStatusEnum(Integer status) {
        this.status = status;
    }

    public static Integer success(){return SUCCESS.value();}

    public static Integer fail(){
        return FAIL.value();
    }

    public Integer value() {
        return status;
    }
}
