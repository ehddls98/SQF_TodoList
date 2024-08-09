package com.study.todolist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
       registry.addMapping("/**")   //모든 매핑주소에 대해 요청 가능
               .allowedOriginPatterns("*") //어떤 주소에서든 요청 가능
               .allowedMethods("*")
               .allowedHeaders("*")
               .allowCredentials(true);
    }
}
