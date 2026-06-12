import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLoginSuccess(user);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión con el servidor. Por favor, verifica que el backend esté ejecutándose.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffe4ec, #f8d7ff)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 15px 35px rgba(199, 125, 255, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "15px",
          }}
        >
          🌸
        </div>
        <h2
          style={{
            color: "#d63384",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "28px",
          }}
        >
          Bienvenido
        </h2>
        <p
          style={{
            color: "#777",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
          Ingresa tus credenciales para acceder al sistema
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c77dff",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Usuario
            </label>
            <input
              type="text"
              placeholder="Introduce tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                outline: "none",
                fontSize: "15px",
                background: "rgba(255, 255, 255, 0.9)",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c77dff")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "30px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#c77dff",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                outline: "none",
                fontSize: "15px",
                background: "rgba(255, 255, 255, 0.9)",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c77dff")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ff66b3, #c77dff)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 5px 15px rgba(255, 102, 179, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(255, 102, 179, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "0 5px 15px rgba(255, 102, 179, 0.3)";
            }}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
