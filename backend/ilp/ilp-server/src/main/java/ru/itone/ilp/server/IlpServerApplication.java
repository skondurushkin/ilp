package ru.itone.ilp.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.server.configuration.EmailConfig;
import ru.itone.ilp.server.configuration.WebSecurityConfig;

@SpringBootApplication
@ComponentScan({"ru.itone.ilp.server.controllers", "ru.itone.ilp.services"})
@Import({WebSecurityConfig.class, EmailConfig.class})
public class IlpServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(IlpServerApplication.class, args);
	}

}
