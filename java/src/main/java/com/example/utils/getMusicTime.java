package com.example.utils;

import ws.schild.jave.EncoderException;
import ws.schild.jave.InputFormatException;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.info.MultimediaInfo;

import javax.sound.sampled.*;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * author ye
 * createDate 2022/4/8  20:38
 * 获取音乐的时长
 */
public class getMusicTime {
    public static int getTime(String url){
        MultimediaObject instance = null;
        MultimediaInfo info = null;
        int time = 0;
        try {
            instance = new MultimediaObject(new URL(url));
            info = instance.getInfo();
            time = (int) info.getDuration()/1000;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return time;
    }
}
