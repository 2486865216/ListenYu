package com.example.baseResponse;

import lombok.Data;

import java.io.Serializable;

/**
 * author ye
 * createDate 2022/4/4  20:13
 */
@Data
public class BaseResponse<T> implements Serializable {
    private static final long serialVersionUID = -215641357324582728L;
    private int code;

    private T data;

    private String message;

    public BaseResponse(int code, T data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}
