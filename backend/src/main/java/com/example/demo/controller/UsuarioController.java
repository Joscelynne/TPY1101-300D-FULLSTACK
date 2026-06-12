package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; // ¡Este era el que faltaba!

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Evita bloqueos de seguridad con React
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // 1. LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsernameAndPassword(loginData.getUsername(),
                loginData.getPassword());

        if (usuarioOpt.isPresent()) {
            return ResponseEntity.ok(usuarioOpt.get());
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }

    // 2. LISTAR USUARIOS
    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // 3. CREAR USUARIO
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // 4. MODIFICAR USUARIO
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> modificar(@PathVariable Long id, @RequestBody Usuario datosNuevos) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setUsername(datosNuevos.getUsername());
                    usuario.setPassword(datosNuevos.getPassword());
                    usuario.setEmail(datosNuevos.getEmail());
                    return ResponseEntity.ok(usuarioRepository.save(usuario));
                }).orElse(ResponseEntity.notFound().build());
    }

    // 5. ELIMINAR USUARIO
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}