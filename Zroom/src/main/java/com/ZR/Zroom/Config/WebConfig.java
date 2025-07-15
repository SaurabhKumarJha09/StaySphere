package com.ZR.Zroom.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/images/**") // URL pattern
                .addResourceLocations("file:uploads/"); // Folder location on disk
    }
}
