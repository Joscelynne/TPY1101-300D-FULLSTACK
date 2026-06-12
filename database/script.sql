CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, -- Usa AUTO_INCREMENT si eliges MySQL
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Insertar un usuario de prueba para poder probar el Login de inmediato
INSERT INTO usuarios (username, password, email) 
VALUES ('admin', 'admin123', 'admin@test.com');