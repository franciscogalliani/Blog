import axios from "axios";
import { useState } from "react";

/* Este componente se encarga de crear los posteos
Declara estados iniciales y tiene un error handler
El componente consta de varios handlers que van capturando tanto el valor de los campos de texto
como el de la imagen que se sube. En uno de los estados se guarda la url local de la imagen para previsualizarla.
Obviamente las url solo sirven en la sesión actual y se pierden si el usuario refresca
Podría habler implementado un sistema de guardado en la nube para las imagenes con cloudinary o similares.
Una vez completados todos los campos cuando se realiza el submit, se dispara un post y se limpia el formulario para seguirlo completando
Tambien se llama nuevamente a fetchPosts para actualizar y que el usuario no tenga que refrescar la pagina */

function CreatePost({ user_id, fetchPosts }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png");
  const [post, setPost] = useState({
    title: "",
    text: "",
  });
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handlePost = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      user_id,
      title: post.title,
      text: post.text,
      image: imageUrl,
    };

    try {
      if (post.title && post.text) {
        console.log(formData);
        const response = await axios.post(
          "http://localhost:3000/post",
          formData
        );
        if (response.status === 200) {
          event.target.reset();
          setImageUrl("https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png");
        }
        fetchPosts(user_id);
      } else setError("Faltan completar campos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[100%] px-4 py-6 mx-auto mt-6 text-left bg-white shadow-lg">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese el titulo del posteo</label>
          <input
            type="text"
            name="title"
            onChange={handlePost}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label>Ingrese el contenido del posteo</label>
          <input
            type="text-area"
            name="text"
            onChange={handlePost}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 mt-2">
            Selecciona una imagen:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="pb-6"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Imagen seleccionada"
              width="250px"
              height="250px"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-900 ml-auto"
        >
          Crear Posteo
        </button>
        {error && (
          <label className="px-6 py-1 mt-2 text-red-500">{error}</label>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
