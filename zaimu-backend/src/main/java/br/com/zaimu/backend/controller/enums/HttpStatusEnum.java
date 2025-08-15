package br.com.zaimu.backend.controller.enums;

public enum HttpStatusEnum {
    OK(0),
    FAIL(1);
    private final Integer status;

    HttpStatusEnum(Integer status) {
        this.status = status;
    }

    public static Integer sucess(){
        return OK.value();
    }

    public static Integer fail(){
        return FAIL.value();
    }

    public Integer value() {
        return status;
    }
}
