package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Esto servirá para el login directo sin complicaciones
    Optional<Usuario> findByUsernameAndPassword(String username, String password);
}