import { Posts } from '../index';

/* Esta función se encarga de retornar las publicaciones de un usuario en concreto
La función debe recibir una query por parametro para realizar la paginación
En este caso pagína los resultados de 5 en 5
Ademas retorna un atributo con la cantidad de posteos que tiene un usuario
*/

const getPosts = async (user_id: number, page: number) => {

    const numberOfPosts = await Posts.count({
        where: {
            user_id
        }
    }) 
    const pageSize = 5
    const offset = page * pageSize;
    

    const posts = await Posts.findAll({
        where: {
            user_id,
        },
        order: [
            ['post_id', 'DESC']
        ],
        limit: pageSize,
        offset
    });

    return {
        numberOfPosts,
        posts
    };
}

export default getPosts;
