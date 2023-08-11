import { Posts } from '../index';

// Esta función se encarga de actualizar cualquier de los 3 campos de un posteo y guardarlo en la base de datos

const updatePost = async (post_id: number, title?: string, text?: string, image?: string) => {
    let post = await Posts.findByPk(post_id);
    if(title) post.title = title;
    if(text) post.text = text;
    if(image) post.image = image;
    await post.save();

    return post;
}

export default updatePost;