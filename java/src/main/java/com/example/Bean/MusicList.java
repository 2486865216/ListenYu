package com.example.Bean;

import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;

/**
 * author ye
 * createDate 2022/4/5  20:12
 */
@TableName("musiclist")
public class MusicList implements Serializable {
    private static final long serialVersionUID = -1817367153101658740L;
    private Integer id;
    private String name;
    private String url;
    private String time;

    public MusicList() {
    }

    public MusicList(Integer id, String name, String url, String time) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.time = time;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
