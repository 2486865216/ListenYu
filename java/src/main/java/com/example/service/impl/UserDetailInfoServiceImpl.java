package com.example.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.Bean.User;
import com.example.Bean.UserDetailInfo;
import com.example.mapper.UserDetailInfoMapper;
import com.example.mapper.UserMapper;
import com.example.service.UserDetailInfoService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * author ye
 * createDate 2022/4/23  14:04
 */
@Service
public class UserDetailInfoServiceImpl extends ServiceImpl<UserDetailInfoMapper, UserDetailInfo> implements UserDetailInfoService {

    @Autowired
    private UserDetailInfoMapper userDetailInfoMapper;
    @Override
    public UserDetailInfo getUserDetailInfo(String username) {
        return userDetailInfoMapper.selectOne(new QueryWrapper<UserDetailInfo>().eq("username", username));
    }
}
