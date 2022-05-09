package com.example.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * author ye
 * createDate 2022/4/20  10:22
 */
public class ContextHelper {
    //从请求头获取UserID
    public static Integer getUserId(HttpServletRequest request){
        String token = request.getHeader("token");
        return JwtHelper.getUserId(token);
    }

    //从请求头获取UserName
    public static String getUserName(HttpServletRequest request){
        String token = request.getHeader("token");
        return JwtHelper.getUserName(token);
    }
}
