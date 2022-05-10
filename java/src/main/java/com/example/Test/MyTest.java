package com.example.Test;

import java.sql.*;

/**
 * author ye
 * createDate 2022/3/29  9:28
 */
public class MyTest {
    public static void main(String[] args) throws SQLException {
        Connection connection = DriverManager.
                getConnection("jdbc:mysql://localhost:3306/listenyu", "root", "123456");
        String sql = "select * from test where id = 1";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()){
                System.out.println(resultSet.getString(2));
                Blob blob = resultSet.getBlob(3);
                System.out.println(resultSet.getBlob(3));
                System.out.println(blob);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            connection.close();
            preparedStatement.close();
            resultSet.close();
        }
    }
}


    /*InputStream inputStream = null;
    FileOutputStream outputStream = null;
        try {
                inputStream = music.getBinaryStream();
                outputStream = new FileOutputStream("test.mp3");
                byte[] buffer = new byte[1024 * 1024];
                int length = 0;
                while ((length = inputStream.read(buffer)) != -1){
                outputStream.write(buffer, 0, length);
                }
                } catch (Exception e) {
                e.printStackTrace();
                }  finally {
                if (inputStream != null){
                try {
                inputStream.close();
                } catch (IOException e) {
                e.printStackTrace();
                }
                }
                if (outputStream != null){
                try {
                outputStream.close();
                } catch (IOException e) {
                e.printStackTrace();
                }
                }
                }*/
