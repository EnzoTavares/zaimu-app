package br.com.zaimu.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import java.util.Properties;

@SpringBootApplication
public class ZaimuBackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		new SpringApplicationBuilder(ZaimuBackendApplication.class)
				.properties(properties())
				.allowCircularReferences(true)
				.build()
				.run(args);

	}

	private static Properties properties() {
		Properties properties = new Properties();
		properties.put("spring.mvc.servlet.path", "/zaimu-app/services");
		return properties;
	}
}
