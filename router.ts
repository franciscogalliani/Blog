import express from 'express';
import findUser from './Controllers/findUser';
import createUser from './Controllers/createUser';
import createPost from './Controllers/createPost';
import getPosts from './Controllers/getPosts';
import updatePost from './Controllers/updatePost';
import deletePost from './Controllers/deletePost';

const router = express.Router();

/* La autenticación es super basica, se me ocurren numerosas formas de mejorarla
como usar JWT para las sesiones, hashear las constraseñas entre otras formas de aumentar la seguridad */

// Ruta encargada de registrar un nuevo usuario, primero valida que no exista.
router.post('/register', async (req, res) => {
    try {
        const { user, password } = req.body;
        const userRegistered = await findUser(user, password)
        if(!userRegistered) {
            await createUser(user, password);
            res.status(200).send('Usuario registrado con exito')
        } else throw new Error('Usuario ya registrado')
    } catch (error: any) {
        if(error) res.status(400).send(error.message)
    }
})

// Ruta encargada de loguear
router.post('/login', async (req, res) => {
    try {
        const { user, password } = req.body;
        if(user && password) {
            const userLogged = await findUser(user, password)

            if(userLogged) res.status(200).json(userLogged)
            else throw new Error('Credenciales Invalidas')
        } else throw new Error('Los campos no pueden estar vacíos')
        
    } catch (error: any) {
        if(error) res.status(400).send(error.message)
    }
})

// Ruta encargaada de crear un nuevo post
router.post('/post', async (req, res) => {
    try {
        const { user_id, title, text, image } = req.body

        if(user_id && title && text) {
            let newPost = await createPost(user_id, title, text, image);
            res.status(200).json(newPost);
        } else throw new Error('Faltan completar campos')
    } catch (error: any) {
        if(error) res.status(400).send(error.message)
    }
})

// Ruta encargada de obtener y paginar los posteos de un usuario.
// Recibe el id del usuario por parametro y el numero de pagina por query ('page=0')
router.get('/post/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const { page = 0 } = req.query
        
        const posts = await getPosts(Number(user_id), Number(page));
        if(posts.posts.length) res.status(200).json(posts);
        else throw new Error('No hay publicaciones')
    } catch (error: any) {
        if(error) res.status(400).send(error.message)
    }
})

// Ruta encargada de actualizar un posteo, recibe el id del posteo por parametro y los campos que se desean modificar por body.
router.put('/post/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const { title, text, image } = req.body;

        if(title || text || image) {
            const updatedPost = await updatePost(Number(post_id), title, text, image)
            res.status(200).json(updatedPost)
        } else throw new Error('Missings parameters')
    } catch (error: any) {
        if(error) res.status(400).send(error.message)
    }
})

// Ruta encargada de eliminar un posteo, recibe por parametro el id del posteo que se desea eliminar
router.delete('/post/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const deletedPost = await deletePost(Number(post_id));
        if(deletedPost) res.status(200).json(deletedPost)
        else throw new Error('Error al borrar el registro')
    } catch (error: any) {
        if(error) res.status(400).send(error.message)
    }
})

export default router;