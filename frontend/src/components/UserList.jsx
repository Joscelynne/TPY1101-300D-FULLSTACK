import { useState } from "react";

function UserList() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@gmail.com" },
    { id: 2, nombre: "María Soto", correo: "maria@gmail.com" },
    { id: 3, nombre: "Pedro González", correo: "pedro@gmail.com" },
  ]);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const agregarUsuario = () => {
    if (!nombre || !correo) {
      alert("Completa todos los campos");
      return;
    }

    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      correo,
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    setNombre("");
    setCorreo("");
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
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
            ✨ Crear Usuario
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
              onClick={agregarUsuario}
              style={{
                background:
                  "linear-gradient(135deg, #ff66b3, #c77dff)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "14px 25px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ➕ Agregar
            </button>
          </div>
        </div>

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
                  background:
                    "linear-gradient(135deg, #ff66b3, #c77dff)",
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
                  <td style={{ padding: "15px" }}>{usuario.nombre}</td>
                  <td style={{ padding: "15px" }}>{usuario.correo}</td>

                  <td style={{ padding: "15px" }}>
                    <button
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
                      onClick={() =>
                        eliminarUsuario(usuario.id)
                      }
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;