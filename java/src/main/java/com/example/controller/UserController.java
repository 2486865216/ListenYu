package com.example.controller;

import com.example.Bean.LoginInfo;
import com.example.Bean.User;
import com.example.Bean.UserDetailInfo;
import com.example.baseResponse.BaseResponse;
import com.example.baseResponse.ResultUtils;
import com.example.service.impl.UserDetailInfoServiceImpl;
import com.example.service.impl.UserServiceImpl;
import com.example.utils.CreateCodeImage;
import com.example.utils.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * author ye
 * createDate 2022/4/20  8:30
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(allowCredentials = "true", originPatterns = {"*"})
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserDetailInfoServiceImpl userDetailInfoService;


    //登录验证
    @PostMapping("/login")
    public BaseResponse<Object> login(@RequestBody LoginInfo loginInfo, HttpServletRequest request){
        //验证码
        HttpSession session = request.getSession();
        String sessionverifiCode = (String) session.getAttribute("verifiCode");
        String vrifiCode = loginInfo.getVrifiCode();
        if ("".equals(sessionverifiCode) || sessionverifiCode == null){
            return ResultUtils.error(499, "验证码失效!", "登陆失败!");
        }
        sessionverifiCode = sessionverifiCode.toLowerCase();
        vrifiCode = vrifiCode.toLowerCase();
        if (!sessionverifiCode.equals(vrifiCode)){
            return ResultUtils.error(500, "验证码错误!", "登陆失败!");
        }

        session.removeAttribute("verifiCode");

        User user =userService.getUser(loginInfo);
        if (user != null){
            Map<String, Object> map = new HashMap<>();
            map.put("token", JwtHelper.createToken(user.getId()));
            return ResultUtils.success(map);
        }else{
            return ResultUtils.error(500, "用户名或者密码错误", "登陆失败!");
        }
    }

    //获取用户信息
    @GetMapping("/getinfo")
    public BaseResponse<Object> getInfo(@RequestHeader String token){
        boolean expiration = JwtHelper.isExpiration(token);
        if (expiration){
            return ResultUtils.error(498, "token过期", "登陆失败!");
        }
        Integer userId = JwtHelper.getUserId(token);
        User user = userService.getUserById(userId);
        Map<String, Object> map = new HashMap<>();
        user.setPassword("");
        map.put("user", user);
        return ResultUtils.success(map);
    }

    //获取登录验证码
    @GetMapping("/getVerifiCode")
    public BaseResponse<String> getCodeImage(HttpServletRequest request){
        BufferedImage image = CreateCodeImage.getImage();
        String verifiCode = new String(CreateCodeImage.getVerifiCode());
        HttpSession session = request.getSession();
        session.setAttribute("verifiCode", verifiCode);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, "png", byteArrayOutputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        byte[] bytes = byteArrayOutputStream.toByteArray();
        BASE64Encoder encoder = new BASE64Encoder();
        String url = encoder.encodeBuffer(bytes).trim().replaceAll("\n", "").replaceAll("\r", "");

        return ResultUtils.success("data:image/jpg;base64," + url);
    }

    //获取详细信息
    @GetMapping("/getDetailInfo/{username}")
    public BaseResponse<UserDetailInfo> getDetailInfo(@PathVariable String username){
        UserDetailInfo userDetailInfo = null;
        userDetailInfo = userDetailInfoService.getUserDetailInfo(username);
        return ResultUtils.success(userDetailInfo);
    }
}
