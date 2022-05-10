package com.example.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.Argument;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sun.security.util.Length;

import java.util.HashMap;
import java.util.Map;

/**
 * author ye
 * createDate 2022/4/30  13:17
 */
@Configuration
public class RabbitMQConfig {
    //交换机
    public static final String RECOMMENDED_EXCHANGE_NAME = "recommended";
    //队列
    public static final String RECOMMENDED_QUEUE_NAME1 = "recommended_queue1";
    public static final String RECOMMENDED_QUEUE_NAME2 = "recommended_queue2";
    public static final String RECOMMENDED_QUEUE_NAME3 = "recommended_queue3";
    public static final String RECOMMENDED_QUEUE_NAME4 = "recommended_queue4";
    //RoutingKey
    public static final String RECOMMENDED_ROUTING_KEY1 = "recommended_routing_key1";
    public static final String RECOMMENDED_ROUTING_KEY2 = "recommended_routing_key2";
    public static final String RECOMMENDED_ROUTING_KEY3 = "recommended_routing_key3";
    public static final String RECOMMENDED_ROUTING_KEY4 = "recommended_routing_key4";

    //声明交换机
    @Bean
    public DirectExchange recommendedExchange() {
        return ExchangeBuilder.directExchange(RECOMMENDED_EXCHANGE_NAME)
                .durable(true)
                .build();
    }

    //声明队列
    @Bean
    public Queue recommendedQueue1() {
        Map<String, Object> map = new HashMap<>();
        map.put("x-max-length" ,5);
        return QueueBuilder.durable(RECOMMENDED_QUEUE_NAME1).withArguments(map).autoDelete().build();
    }
    @Bean
    public Queue recommendedQueue2() {
        Map<String, Object> map = new HashMap<>();
        map.put("x-max-length" ,5);
        return QueueBuilder.durable(RECOMMENDED_QUEUE_NAME2).withArguments(map).autoDelete().build();
    }
    @Bean
    public Queue recommendedQueue3() {
        Map<String, Object> map = new HashMap<>();
        map.put("x-max-length" ,5);
        return QueueBuilder.durable(RECOMMENDED_QUEUE_NAME3).withArguments(map).autoDelete().build();
    }
    @Bean
    public Queue recommendedQueue4() {
        Map<String, Object> map = new HashMap<>();
        map.put("x-max-length" ,5);
        return QueueBuilder.durable(RECOMMENDED_QUEUE_NAME4).withArguments(map).autoDelete().build();
    }

    //绑定
    @Bean
    public Binding bindingConfirm1(
            @Qualifier("recommendedQueue1") Queue queue,
            @Qualifier("recommendedExchange") DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(RECOMMENDED_ROUTING_KEY1);
    }
    @Bean
    public Binding bindingConfirm2(
            @Qualifier("recommendedQueue2") Queue queue,
            @Qualifier("recommendedExchange") DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(RECOMMENDED_ROUTING_KEY2);
    }
    @Bean
    public Binding bindingConfirm3(
            @Qualifier("recommendedQueue3") Queue queue,
            @Qualifier("recommendedExchange") DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(RECOMMENDED_ROUTING_KEY3);
    }
    @Bean
    public Binding bindingConfirm4(
            @Qualifier("recommendedQueue4") Queue queue,
            @Qualifier("recommendedExchange") DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(RECOMMENDED_ROUTING_KEY4);
    }
}
