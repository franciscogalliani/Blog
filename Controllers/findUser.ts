import { Users } from '../index';

/* Esta función toma el usuario y la contraseña y los matchea con los registros de la base de datos
En caso de encontrarlo, retorna al usuario, de lo contrario retorna null
*/


const findUser = async (username: string, password: string) => {
    const userFound = await Users.findOne({
        where: {
            user: username,
            password
        }
    })
    
    return userFound
};

export default findUser;