package com.example.demo;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(UsuarioRepository repository) {
		return args -> {
			if (repository.findByUsernameAndPassword("admin", "admin123").isEmpty()) {
				Usuario admin = new Usuario();
				admin.setUsername("admin");
				admin.setPassword("admin123");
				admin.setEmail("admin@test.com");
				repository.save(admin);
				System.out.println("----------------------------------------");
				System.out.println("USUARIO ADMIN CREADO: admin / admin123");
				System.out.println("----------------------------------------");
			}
		};
	}
}
