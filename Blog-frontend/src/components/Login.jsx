import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Login ({ isAuth, log }) {

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth === true) navigate('/blog?page=0')
    },[])

    const [login, setLogin] = useState({
        user: '',
        password: ''
    }) 

    const [error, setError] = useState('')

    const setLoginHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLogin({
            ...login,
            [name]: value
        })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        if(!login.user || !login.password) setError('Faltan completar campos');
        authLogin();
    }

    const authLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', login);
            log(response.data)
            navigate('/blog');
        } catch (error) {
            if(error) setError('El usuario no existe');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Iniciar Sesión</h3>
                <form>
                    <div className="mt-4">
                        <div>
                            <label className="block">Usuario</label>
                            <input type="text" placeholder="Usuario" name="user"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={setLoginHandler}/>
                        </div>
                        <div className="mt-4">
                            <label className="block">Contraseña</label>
                            <input type="password" placeholder="Contraseña" name="password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={setLoginHandler}/>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={loginHandler}>Iniciar Sesión</button>
                            <Link to="/register" className="text-sm text-blue-600 hover:underline">Registrate</Link>
                        </div>
                        { error && <p className='px-6 py-1 mt-2 text-red-500'>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login