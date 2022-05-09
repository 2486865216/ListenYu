package com.example.controller;


import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectResult;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.Bean.MusicList;
import com.example.baseResponse.BaseResponse;
import com.example.baseResponse.ResultUtils;
import com.example.mapper.MusicListMapper;

import java.io.*;
import java.util.List;

import com.example.service.impl.MainServiceImpl;
import com.example.utils.getMusicTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;


/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zhangyuye
 * @since 2022-03-28
 */
@RestController
@RequestMapping("/main")
//解决跨域
@CrossOrigin(allowCredentials = "true", originPatterns = {"*"})
public class MainController {

    @Autowired
    private MainServiceImpl mainService;

    //文件上传
    @PostMapping("/upload")
    public BaseResponse<String> upload(MultipartFile file){
        return mainService.uploadMusicList(file);
    }

    //获取音乐
    @GetMapping("/music")
    public BaseResponse<List<MusicList>> getMusicList(){
        return ResultUtils.success(mainService.getMusicList());
    }

    //搜索
    @GetMapping("/search/{name}")
    public BaseResponse<List<MusicList>> searchMusicList(@PathVariable String name) {
        List<MusicList> musicListResult = mainService.searchMusicList(name);
        return ResultUtils.success(musicListResult);
    }
}
