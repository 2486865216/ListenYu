package com.example.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Bean.LoginInfo;
import com.example.Bean.User;
import com.example.Bean.UserDetailInfo;
import com.example.mapper.UserMapper;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * author ye
 * createDate 2022/4/20  12:28
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public User getUser(LoginInfo loginInfo) {
        User user = userMapper.selectOne(new QueryWrapper<User>()
                .eq("username", loginInfo.getUsername())
                .eq("password", loginInfo.getPassword())
        );
        return user;
    }

    @Override
    public User getUserById(Integer userId) {
        return userMapper.selectById(userId);
    }
}
