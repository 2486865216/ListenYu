package com.example.service.impl;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectResult;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.Bean.MusicList;
import com.example.baseResponse.BaseResponse;
import com.example.baseResponse.ResultUtils;
import com.example.mapper.MusicListMapper;
import com.example.service.MainService;
import com.example.utils.getMusicTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * author ye
 * createDate 2022/5/2  12:57
 */
@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private MusicListMapper musicListMapper;

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public List<MusicList> getMusicList() {
        List<MusicList> list = musicListMapper.selectList(null);
        for (MusicList musicList : list) {
            String key = musicList.getId() + ":" + musicList.getName();
            redisTemplate.opsForValue().set(key, musicList);
        }
        return list;
    }

    @Override
    public List<MusicList> searchMusicList(String name) {
        String key = "*" + name + "*";
        MusicList musicList = null;
        List<MusicList> list = new ArrayList<>();
        Set keys = redisTemplate.keys(key);
        for (Object o : keys) {
            musicList = (MusicList) redisTemplate.opsForValue().get(o);
            list.add(musicList);
        }
        if (keys.size() == 0){
            list = musicListMapper.selectList(new QueryWrapper<MusicList>().like("name", name));
            if (!list.isEmpty()){
                for (MusicList musicList1 : list) {
                    redisTemplate.opsForValue().set(musicList1.getId() + ":" + musicList1.getName(), musicList1);
                }
            }
        }
        return list;
    }

    //上传文件到阿里云
    @Override
    public BaseResponse<String> uploadMusicList(MultipartFile file) {
        //地域节点以及各种登录阿里云对象存储的信息
        String endpoint = "****************";
        String buckerName = "*******************";
        String OSSAccessKeyId = "**********************";
        String OSSAccessKeySecret = "**********************";
        String dir = "music/";
        OSS ossClient = new OSSClientBuilder().build(endpoint, OSSAccessKeyId, OSSAccessKeySecret);

        String fileName = file.getOriginalFilename();
        /*System.out.println(fileName);
        fileName = UUID.randomUUID().toString().substring(0, 6) + ".mp3";

        File desFile = new File("C:\\Users\\YQ\\DesktopFile\\ListenYu\\tmp" + "/" + fileName);
        try {
            file.transferTo(desFile);
        } catch (IOException e) {
            e.printStackTrace();
            return ResultUtils.error(500, e.toString(), "文件上传失败");
        }*/
        InputStream desFile = null;
        try {
            desFile = file.getInputStream();
        } catch (IOException e) {
            e.printStackTrace();
            return ResultUtils.error(500, e.toString(), "文件上传失败");
        }

        String musicURL = "https://"+ buckerName +"." + endpoint + "/" + dir + fileName;

        PutObjectResult putObjectResult = ossClient.putObject(buckerName, dir + fileName, desFile);
        ossClient.shutdown();

        int time = getMusicTime.getTime(musicURL);

        int x = time / 60;
        String x1  = x < 10 ? "0" + x : String.valueOf(x);

        int y = time % 60;
        String y1  = y < 10 ? "0" + y : String.valueOf(y);

        String timeString = x1 + ":" + y1;

        //插入数据库
        assert fileName != null;
        String musicName = fileName.substring(0, fileName.length() - 4);
        MusicList musicList = new MusicList(null, musicName, musicURL, timeString);
        musicListMapper.insert(musicList);
        
        //插入redis
        Integer last_insert_id = musicListMapper.selectLastUser();
        String key = last_insert_id + ":" + musicName;
        musicList.setId(last_insert_id);
        redisTemplate.opsForValue().set(key, musicList);

        return ResultUtils.success(musicURL);
    }
}
