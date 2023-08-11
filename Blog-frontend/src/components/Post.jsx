import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useState } from 'react'
import axios from "axios";

function Post ({ title, text, image, post_id, user_id, fetchPosts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedText, setEditedText] = useState(text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/post/${post_id}`, { title: editedTitle, text: editedText })
            fetchPosts(user_id)
            setIsEditing(false);
        } catch (error) {
            console.log(error)
        }
        
      };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/post/${post_id}`)
            fetchPosts(user_id)
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex mt-6 rounded-lg bg-orange-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <img
            className="rounded-t-lg"
            src={image}
            alt=""
            height="300px"
            width="300px"
          />
          <div className="p-6 max-w-2xl">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="mb-2 text-xl font-medium leading-tight text-neutral-800"
              />
            ) : (
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 break-words">
                {title}
              </h5>
            )}
            {isEditing ? (
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="block mb-4 text-base text-neutral-600"
              />
            ) : (
              <p className="mb-4 text-base text-neutral-600 break-words">{text}</p>
            )}
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="block bg-blue-500 text-white px-3 py-1 rounded-md"
              >
                Save
              </button>
            ) : (
              <div className="flex gap-3 p-3">
                <BsFillPencilFill
                  className="h-6 w-6 hover:text-red-500 cursor-pointer"
                  onClick={handleEditClick}
                />
                <BsFillTrash3Fill
                  className="h-6 w-6 hover:text-red-500 cursor-pointer"
                  onClick={openModal}
                />
              </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="mb-4 text-base text-neutral-600">
                            ¿Estás seguro de que quieres eliminar este registro?
                        </p>
                        
                        <div className="flex justify-end">
                            <button className="mr-2 text-neutral-600 hover:text-red-500" onClick={closeModal}>Cancelar</button>
                            <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      );
    };

export default Post


