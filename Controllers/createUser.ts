import { Users } from '../index';

// Esta función crea el usuario en la base de datos
const createUser = async (username: string, password: string) => {
    await Users.create({ user: username , password });
};

export default createUser;