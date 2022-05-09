package com.example.utils;

import io.jsonwebtoken.*;

import java.util.Date;

/**
 * author ye
 * createDate 2022/4/20  9:57
 */
public class JwtHelper {
    private static final long tokenExpiration = 60 * 60 * 24 * 1000;
    private static final String tokenStringKey = "123456";

    //生成token
    public static String createToken(Integer userId){
        String token = Jwts.builder()
                .setSubject("USER")
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration) )
                .claim("userId", userId)
                .signWith(SignatureAlgorithm.HS256, tokenStringKey)
                .compressWith(CompressionCodecs.GZIP)
                .compact();
        return token;
    }

    //从token中获取userId
    public static Integer getUserId(String token){
        if (token.isEmpty()) return null;
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenStringKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        return (Integer) claims.get("userId");
    }

    //从token中获取userName
    public static String getUserName(String token){
        if (token.isEmpty()) return "";
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenStringKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        return (String) claims.get("username");
    }

    //判断token是否过期
    public static boolean isExpiration(String token){
        boolean isExpired = Jwts.parser()
                .setSigningKey(tokenStringKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration().before(new Date());
        return isExpired;
    }

    //刷新token
    public String refreshToken(String token){
        String refreshToken = null;
        try {
            final Claims claims = Jwts.parser()
                    .setSigningKey(tokenStringKey)
                    .parseClaimsJws(token)
                    .getBody();
            refreshToken = JwtHelper.createToken(getUserId(token));
        }catch (Exception e){
            e.printStackTrace();
        }
        return refreshToken;
    }
}
