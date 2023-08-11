import { Users, Posts } from '../index';

// Esta función se encarga de crear un post tomando la id del usuario y asignandole el registro.
// Retorna el nuevo post creado

const createPost = async (user_id: number, title: string, text: string, image?: string) => {
    const userFound = await Users.findByPk(user_id);
    if(userFound) {
        const newPost = await Posts.create({
            user_id,
            title,
            text,
            image
        });

        await userFound.addPost(newPost); 
        return newPost;
    }
}

export default createPost;