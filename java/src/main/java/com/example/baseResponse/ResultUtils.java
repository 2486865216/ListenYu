package com.example.baseResponse;

/**
 * author ye
 * createDate 2022/4/4  20:15
 */
public class ResultUtils{
    public static <T> BaseResponse<T> success(T data){
        return new BaseResponse<>(200 , data, "success!");
    }
    public static <T> BaseResponse<T> error(int code, T data, String message){
        return new BaseResponse<>(code , data, message);
    }
}
