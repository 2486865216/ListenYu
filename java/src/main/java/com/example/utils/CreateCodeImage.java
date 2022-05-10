package com.example.utils;

import java.awt.*;
import java.awt.image.BufferedImage;

/**
 * author ye
 * createDate 2022/4/20  8:37
 */
public class CreateCodeImage {
    private static int width = 90;
    private static int height = 35;
    private static int font_size = 20;
    private static char[] verifiCode;//验证码
    private static BufferedImage image;


    //获取验证码图片
    public static BufferedImage getImage(){
        image = new BufferedImage(width, height, BufferedImage.TYPE_INT_BGR);
        Graphics graphics = image.getGraphics();

        verifiCode = generateCheckCode();
        drawBackground(graphics);
        drawRands(graphics, verifiCode);

        return image;
    }

    //获取验证码
    public static char[] getVerifiCode(){
        return verifiCode;
    }

    //随机生成验证码
    private static char[] generateCheckCode() {
        String chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        char[] rand = new char[4];
        for (int i = 0; i < 4; i++) {
            int randInt = (int) (Math.random() * 62);
            rand[i] = chars.charAt(randInt);
        }
        return rand;
    }

    //绘制背景图
    private  static void drawBackground(Graphics graphics) {
        graphics.setColor(Color.black);
        graphics.fillRect(0, 0, width, height);

        //绘制验证码干扰点
        for (int i = 0; i < 200; i++) {
            int x = (int) (Math.random() * width);
            int y = (int) (Math.random() * height);
            graphics.setColor(Color.red);
            graphics.drawOval(x, y , 1 , 1);
        }
    }

    //绘制验证码
    private static void drawRands(Graphics graphics, char[] rands) {
        graphics.setFont(new Font("Console", Font.BOLD, font_size));
        for (int i = 0; i < rands.length; i++) {
            graphics.setColor(getRandomColor());
            graphics.drawString("" + rands[i], i * font_size + 10, 25);
        }
    }

    private static Color getRandomColor() {
        return Color.WHITE;
    }
}
