import { Posts } from '../index';

// Esta función borra un post y devuelve 1 en caso de borrar con exito y 0 en caso de que el post no exista
const deletePost = async (post_id: number) => {
    const deletedPost = await Posts.destroy({
        where: {
            post_id
        }
    })

    return deletedPost;
}

export default deletePost;