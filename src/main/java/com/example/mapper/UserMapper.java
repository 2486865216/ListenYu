package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.Bean.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * author ye
 * createDate 2022/4/19  20:16
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
