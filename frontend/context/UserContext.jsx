import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  // 🔹 URL del backend
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 🔹 Función para iniciar sesión
  const login = async (correo, password) => {
    console.log("🟡 Intentando iniciar sesión con:", { correo, password });

    if (!correo || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();
      console.log("🔵 Respuesta del backend en login:", data);

      if (!response.ok) {
        throw new Error(data.error || "Error de autenticación");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setEmail(data.user.correo);
        navigate("/nanomarket/profile"); // Redirige si el login es exitoso
      }
    } catch (error) {
      console.error("🔴 Error en login:", error.message);
      alert(error.message); // Muestra el error al usuario
    }
  };

  // 🔹 Manejo del formulario de login
  const handleLoginSubmit = async (e, loginData) => {
    e.preventDefault();
    console.log("🟠 Datos enviados en login:", loginData);

    if (!loginData.correo || !loginData.password) {
      console.error("❌ Error: Todos los campos son obligatorios");
      return;
    }
    

    await login(loginData.correo, loginData.password);
  };

  // 🔹 Función para registrar usuario
  const register = async (nombre, correo, password) => {
    console.log("🟡 Intentando registrar usuario:", { nombre, correo, password });

    if (!nombre || !correo || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, password }),
      });

      const data = await response.json();
      console.log("🔵 Respuesta del backend en registro:", data);

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }

      return data;
    } catch (error) {
      console.error("🔴 Error en el registro:", error.message);
      alert(error.message);
    }
  };

  // 🔹 Manejo del formulario de registro
  const handleRegisterSubmit = async (e, registerData) => {
    e.preventDefault();
    console.log("🟠 Datos enviados en registro:", registerData);

    if (!registerData.nombre || !registerData.correo || !registerData.password || !registerData.confirmPassword) {
      console.error("❌ Error: Todos los campos son obligatorios");
      return;
    }
    

    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(registerData.nombre, registerData.correo, registerData.password);
      await login(registerData.correo, registerData.password);
    } catch (error) {
      console.error("🔴 Error en el registro:", error.message);
    }
  };

  // 🔹 Función para cerrar sesión
  const logout = () => {
    console.log("🔴 Cierre de sesión");
    localStorage.removeItem("token");
    setToken(null);
    setEmail(null);
    authLogin(null);
    navigate("/nanomarket");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        login,
        register,
        logout,
        handleRegisterSubmit,
        handleLoginSubmit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
