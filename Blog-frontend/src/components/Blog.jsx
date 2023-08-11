import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CreatePost from './CreatePost';
import Post from './Post';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";

function Blog ({ user_id, username, posts, postsNumber, fetchPosts, logout, isAuth }) {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)

    useEffect(() => {
        if (isAuth === false) {
            navigate('/');
        }
        
        const pageParam = searchParams.get('page');
        const currentPage = pageParam ? parseInt(pageParam) : 0;
    
        setPage(currentPage);
        fetchPosts(user_id);
    }, [location]);
    

    const logoutHandler = () => {
        logout()
        navigate('/')
    }

    const maxPage = Math.floor(postsNumber / 5);
    const [page, setPage] = useState(0)

    const handlePage = (e) => {
        let action = e.target.id;
        console.log(action)
        let newPage = page;
        if (action === 'prev' && page > 0) {
            newPage = page - 1;
        } else if (action === 'next' && page < maxPage) {
            newPage = page + 1;
        }
    
        const params = new URLSearchParams(location.search);
        params.set('page', newPage);
        navigate({ search: `?${params.toString()}` });
        setPage(newPage);
    };
    

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center w-[70%] mx-auto text-left bg-white shadow-lg">
                <div className='flex items-center py-4 px-4 w-[100%] bg-orange-200 '>
                    <h1 className='text-4xl flex-1 text-center'>Bienvenido {username} </h1>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 ml-auto" onClick={logoutHandler}>Cerrar Sesión</button>
                </div>
                <p className='mt-6 font-bold'>Crea una publicación</p>
                <div class="border-[0.5px] border-gray-300 w-[70%] mt-4"></div>
                <div><CreatePost fetchPosts={fetchPosts} user_id={user_id}/></div>
                <div className='mb-12'>
                    <h2 className="text-2xl font-bold text-center mt-8">Tus publicaciones</h2>
                    {posts.map(post => <Post user_id={user_id} post_id={post.post_id} title={post.title} text={post.text} image={post.image} fetchPosts={fetchPosts}/>)}
                    <div className='flex gap-9 justify-center mt-12'>
                        {page > 0 && <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" 
                        id="prev" onClick={handlePage}>Anterior</button>}
                        {page < maxPage && <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" 
                        id="next" onClick={handlePage}>Siguiente</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog