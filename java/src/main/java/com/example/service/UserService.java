package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Bean.LoginInfo;
import com.example.Bean.User;

/**
 * author ye
 * createDate 2022/4/20  12:27
 */
public interface UserService extends IService<User> {
    public User getUser(LoginInfo loginInfo);
    public User getUserById(Integer userId);
}
