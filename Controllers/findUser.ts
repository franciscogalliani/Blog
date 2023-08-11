import { Users } from '../index';

/* Esta función toma el usuario y la contraseña y los matchea con los registros de la base de datos
En caso de no encontrar ningun usuario con esos parametro retorna true
En caso de encontrar un usuario retorna false
*/


const findUser = async (username: string, password: string) => {
    const userFound = await Users.findOne({
        where: {
            user: username,
            password
        }
    })
    
    if(!userFound) return true
    return false;
};

export default findUser;