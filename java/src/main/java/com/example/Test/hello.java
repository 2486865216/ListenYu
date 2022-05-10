package com.example.Test;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectResult;
import org.junit.Test;

import java.io.*;

/**
 * author ye
 * createDate 2022/3/29  10:48
 */
public class hello {
    public static void main(String[] args) {
        String endpoint = "oss-cn-guangzhou.aliyuncs.com";
        String buckerName = "zhangyuyetypora";
        String OSSAccessKeyId = "LTAI5tCNy3mYdX9sUyZTFYHd";
        String OSSAccessKeySecret = "g65q2vga5iQup8sVB0aKxjUNcJD80r";
        OSS ossClient = new OSSClientBuilder().build(endpoint, OSSAccessKeyId, OSSAccessKeySecret);
        String localPath = "C:\\Users\\YQ\\DesktopFile\\Listenyu\\tmp";

        String fileName = "test.mp3";

        File file = new File(localPath + "/" + "test.mp3");

        InputStream desFile = null;
        try {
            desFile = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        PutObjectResult putObjectResult = ossClient.putObject(buckerName, "music/" + fileName, desFile);

        ossClient.shutdown();
    }
}
