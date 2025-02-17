import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  

  useEffect(() => {
    if (user) {
      // Simulación de obtención de publicaciones del usuario
      setPosts([
        { id: 0, title: "BIENVENIDO: correo@correo.cl" },
        { id: 1, title: "Primera publicación" },
        { id: 2, title: "Segunda publicación" },
        { id: 3, title: "Tercera publicación" }
      ]);
    }

    return () => {
      setPosts([]);
    };
  }, [user]);

  return (
    <div>
      <h1>{user?.username}</h1>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      
    </div>
  );
};

export default Profile;