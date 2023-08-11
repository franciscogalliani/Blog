import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Register ({ isAuth }) {

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth === true) navigate('/blog?page=0')
    },[])

    const [register, setRegister] = useState({
        user: '',
        password: '',
        confirmPassword: ''
    }) 

    const [error, setError] = useState('')

    const setRegisterHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setRegister({
            ...register,
            [name]: value
        })
    }

    const registerHandler = (e) => {
        e.preventDefault();
        if(!register.user || !register.password || !register.confirmPassword) setError('Faltan completar campos')
        else if(register.password !== register.confirmPassword) setError('Las contraseñas no coinciden')
        else registerUser()
    }

    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', { user: register.user, password: register.password });
            navigate('/')
        } catch (error) {
            if(error) setError('El usuario ya existe')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Registrate</h3>
                <form>
                    <div className="mt-4">
                        <div>
                            <label className="block">Usuario</label>
                            <input type="text" placeholder="Usuario" name="user"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={setRegisterHandler}/>
                        </div>
                        <div className="mt-4">
                            <label className="block">Contraseña</label>
                            <input type="password" placeholder="Contraseña" name="password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={setRegisterHandler}/>
                        </div>
                        <div className="mt-4">
                            <label className="block">Confirmar contraseña</label>
                            <input type="password" placeholder="Confirmar constraseña" name="confirmPassword"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={setRegisterHandler}/>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={registerHandler}>Registrate</button>
                            <Link to="/" className="text-sm text-blue-600 hover:underline">Inicia Sesión</Link>
                        </div>
                        { error && <p className='px-6 py-1 mt-2 text-red-500'>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register