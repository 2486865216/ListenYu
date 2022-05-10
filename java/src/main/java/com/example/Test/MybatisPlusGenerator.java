package com.example.Test;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import org.junit.Test;


/**
 * author ye
 * createDate 2022/3/28  13:38
 */
public class MybatisPlusGenerator {
    @Test
    public void test() {
        DataSourceConfig root = new DataSourceConfig.Builder("jdbc:mysql://127.0.0.1:3306/listenyu", "root", "123456")
                .build();

        GlobalConfig globalConfig = new GlobalConfig.Builder()
                .outputDir("src\\main\\java")
                .author("zhangyuye")
                .commentDate("yyyy-MM-dd")
                .build();

        PackageConfig packageConfig = new PackageConfig.Builder()
                .parent("com.example")
                .entity("Bean")
                .service("service")
                .serviceImpl("service.impl")
                .mapper("mapper")
                .xml("mapper.xml")
                .controller("controller")
                .other("other")
                .build();

        AutoGenerator autoGenerator = new AutoGenerator(root);
        autoGenerator.global(globalConfig);
        autoGenerator.packageInfo(packageConfig);
        autoGenerator.execute();

    }
}
