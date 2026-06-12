import { useState, useEffect } from "react";

function UserList({ onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  // 1. CARGAR USUARIOS DESDE EL BACKEND
  const cargarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error("Error al obtener usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // 2. AGREGAR O ACTUALIZAR USUARIO
  const guardarUsuario = async () => {
    if (!nombre || !correo) {
      alert("Completa todos los campos");
      return;
    }

    const payload = {
      username: nombre,
      email: correo,
      password: "clave123", // Contraseña por defecto solicitada
    };

    try {
      if (editandoUsuario) {
        // Modo Edición (PUT)
        const response = await fetch(`http://localhost:8080/api/usuarios/${editandoUsuario.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setEditandoUsuario(null);
          setNombre("");
          setCorreo("");
          cargarUsuarios();
        } else {
          alert("Error al actualizar el usuario");
        }
      } else {
        // Modo Creación (POST)
        const response = await fetch("http://localhost:8080/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setNombre("");
          setCorreo("");
          cargarUsuarios();
        } else {
          alert("Error al crear el usuario");
        }
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("Error de conexión con el backend");
    }
  };

  // 3. INICIAR EDICIÓN
  const iniciarEdicion = (usuario) => {
    setEditandoUsuario(usuario);
    setNombre(usuario.username);
    setCorreo(usuario.email);
  };

  // 4. CANCELAR EDICIÓN
  const cancelarEdicion = () => {
    setEditandoUsuario(null);
    setNombre("");
    setCorreo("");
  };

  // 5. ELIMINAR USUARIO
  const eliminarUsuario = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        cargarUsuarios();
      } else {
        alert("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error de conexión con el backend");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffe4ec, #f8d7ff)",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(199,125,255,0.25)",
        }}
      >
        {/* Botón de Cerrar Sesión */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <button
            onClick={onLogout}
            style={{
              background: "transparent",
              color: "#d63384",
              border: "2px solid #d63384",
              borderRadius: "12px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#d63384";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#d63384";
            }}
          >
            🚪 Cerrar Sesión
          </button>
        </div>

        <h1
          style={{
            textAlign: "center",
            color: "#d63384",
            marginBottom: "10px",
          }}
        >
          🌷 Gestión de Usuarios
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "35px",
          }}
        >
          Administra los usuarios de forma simple y elegante
        </p>

        {/* Formulario de Crear / Editar */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#c77dff",
              marginBottom: "20px",
            }}
          >
            {editandoUsuario ? "✨ Editar Usuario" : "✨ Crear Usuario"}
          </h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />

            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />

            <button
              onClick={guardarUsuario}
              style={{
                background: "linear-gradient(135deg, #ff66b3, #c77dff)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "14px 25px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editandoUsuario ? "💾 Guardar" : "➕ Agregar"}
            </button>

            {editandoUsuario && (
              <button
                onClick={cancelarEdicion}
                style={{
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Listado de Usuarios */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#c77dff",
              marginBottom: "20px",
            }}
          >
            👩‍💻 Listado de Usuarios
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "linear-gradient(135deg, #ff66b3, #c77dff)",
                  color: "white",
                }}
              >
                <th style={{ padding: "15px" }}>ID</th>
                <th style={{ padding: "15px" }}>Nombre</th>
                <th style={{ padding: "15px" }}>Correo</th>
                <th style={{ padding: "15px" }}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "15px" }}>{usuario.id}</td>
                  <td style={{ padding: "15px" }}>{usuario.username}</td>
                  <td style={{ padding: "15px" }}>{usuario.email}</td>

                  <td style={{ padding: "15px" }}>
                    <button
                      onClick={() => iniciarEdicion(usuario)}
                      style={{
                        background: "#ff85c0",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      ✏️ Editar
                    </button>

                    <button
                      onClick={() => eliminarUsuario(usuario.id)}
                      style={{
                        background: "#ff4d6d",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        cursor: "pointer",
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: "20px", color: "#888" }}>
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;