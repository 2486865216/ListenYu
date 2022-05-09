package com.example.service;

import com.example.Bean.MusicList;
import com.example.baseResponse.BaseResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * author ye
 * createDate 2022/5/2  12:53
 */
public interface MainService {
    List<MusicList> getMusicList();
    List<MusicList> searchMusicList(String name);
    BaseResponse<String> uploadMusicList(MultipartFile file);
}
