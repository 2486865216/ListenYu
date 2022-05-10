package com.example.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.Bean.UserDetailInfo;

/**
 * author ye
 * createDate 2022/4/23  14:02
 */
public interface UserDetailInfoService extends IService<UserDetailInfo> {
    public UserDetailInfo getUserDetailInfo(String username);
}
