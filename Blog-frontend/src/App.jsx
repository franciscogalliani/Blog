import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Blog from "./components/Blog";
import { useState } from "react";
import axios from "axios";

/* En el componente principal de la aplicación declare un estado general con atributos que voy a usar a lo largo de la aplicación
Esto se puede optimizar de muchisimas formas, por ejemplo usando algun gestor de estados como redux o zustand
Tambien declaro otro estado que va a servir para verificar si un usuario esta autenticado o no
Lo podría haber hecho con local storage.
Declaro funciones para login y logout y una función fetch para obtener las publicaciones de determinado usuario
Finalmente declaro 3 rutas, una para login otra para el registro y una para el blog*/

function App() {
  const [user, setUser] = useState({
    user_id: null,
    username: "",
    posts: [],
    postsNumber: 0,
  });

  const [isAuth, setIsAuth] = useState(false);

  const log = (userData) => {
    setIsAuth(true);
    setUser({
      ...user,
      user_id: userData.user_id,
      username: userData.user,
    });
  };

  const logout = () => {
    setIsAuth(false);
    setUser({
      user_id: null,
      username: "",
      posts: [],
      postsNumber: 0,
    });
  };

  const fetchPosts = async (user_id) => {
    try {
      const response = await axios(
        `http://localhost:3000/post/${user_id}${
          location.search ? `${location.search}` : ""
        }`
      );
      setUser({
        ...user,
        posts: response.data.posts,
        postsNumber: response.data.numberOfPosts,
      });
    } catch (error) {
      setUser({
        ...user,
        posts: [],
        postsNumber: 0,
      });
    }
  };

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login isAuth={isAuth} log={log} />} />
        <Route path="/register" element={<Register isAuth={isAuth} />} />
        <Route
          path="/blog"
          element={
            <Blog
              user_id={user.user_id}
              username={user.username}
              posts={user.posts}
              postsNumber={user.postsNumber}
              fetchPosts={fetchPosts}
              logout={logout}
              isAuth={isAuth}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
