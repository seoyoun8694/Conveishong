package com.example.Conveishong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class ConveishongApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConveishongApplication.class, args);
	}

}
