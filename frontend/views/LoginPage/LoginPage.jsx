import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import '../RegisterPage/RegisterPage.css';

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const { handleLoginSubmit } = useContext(UserContext);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <h2 className="text-2xl font-bold mb-4">NanoMercado</h2>
      <form onSubmit={(e) => handleLoginSubmit(e, data)}>
        <h2 className="ini">Inicio de Sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={data.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={data.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

