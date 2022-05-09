package com.example.controller;

import com.example.Bean.MusicList;
import com.example.baseResponse.BaseResponse;
import com.example.baseResponse.ResultUtils;
import com.example.config.RabbitMQConfig;
import com.example.mapper.MusicListMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * author ye
 * createDate 2022/4/30  12:36
 */
@RestController
@RequestMapping("/rabbit")
@CrossOrigin(allowCredentials = "true", originPatterns = {"*"})
public class RabbitMQController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private MusicListMapper musicListMapper;

    List<List<MusicList>> lists = new ArrayList<>();

    @GetMapping("/init")
    public void getRabbitMQ() {
        List<MusicList> musicLists = musicListMapper.selectList(null);

        if (lists.isEmpty()) {
            for (int i = 1; i <= 4; i++) {
                List<MusicList> list = new ArrayList<>();
                for (int j = 0; j < 5; j++) {
                    int index = new Random().nextInt(musicLists.size() - 1);
                    if (!list.contains(musicLists.get(index))) {
                        list.add(musicLists.get(index));
                        rabbitTemplate.convertAndSend(
                                RabbitMQConfig.RECOMMENDED_EXCHANGE_NAME,
                                "recommended_routing_key" + i,
                                musicLists.get(index));
                    } else {
                        j--;
                    }
                }
                lists.add(new ArrayList(list));
            }
        } else {
            for (int i = 0; i < lists.size(); i++) {
                for (MusicList musicList : lists.get(i)) {
                    rabbitTemplate.convertAndSend(
                            RabbitMQConfig.RECOMMENDED_EXCHANGE_NAME,
                            "recommended_routing_key" + (i + 1),
                            musicList);
                }
            }
        }
    }

    @GetMapping("/recommended/{queueId}")
    public BaseResponse<List<MusicList>> getRecommended(@PathVariable("queueId") String queue) {
        List<MusicList> list = new ArrayList<>();
        MusicList musicList = (MusicList) rabbitTemplate.receiveAndConvert("recommended_queue" + queue);
        while (musicList != null) {
            list.add(musicList);
            musicList = (MusicList) rabbitTemplate.receiveAndConvert("recommended_queue" + queue);
        }
        return ResultUtils.success(list);
    }
}
