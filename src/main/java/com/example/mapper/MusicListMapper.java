package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.Bean.MusicList;
import org.apache.ibatis.annotations.Mapper;

/**
 * author ye
 * createDate 2022/4/5  20:26
 */
@Mapper
public interface MusicListMapper extends BaseMapper<MusicList> {
    Integer selectLastUser();
}
