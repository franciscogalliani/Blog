import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Blog from './components/Blog';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState({
    user_id: null,
    username: '',
    posts: [],
    postsNumber: 0
})

  const [isAuth, setIsAuth] = useState(false)

  const log = (userData) => {
    setIsAuth(true)
    setUser({
      ...user,
      user_id: userData.user_id,
      username: userData.user
    })
  }

  const logout = () => {
    setIsAuth(false)
    setUser({
      user_id: null,
      username: '',
      posts: [],
      postsNumber: 0
    })
  }

  const fetchPosts = async (user_id) => {
    try {
      const response = await axios(`http://localhost:3000/post/${user_id}${location.search? `${location.search}` : ''}`)
      setUser({
        ...user,
        posts: response.data.posts,
        postsNumber: response.data.numberOfPosts
    })
    } catch (error) {
      setUser({
        ...user,
        posts: [],
        postsNumber: 0
      })
    }
}

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login isAuth={isAuth} log={log} />} />
        <Route path="/register" element={<Register isAuth={isAuth} />} />
        <Route path="/blog" element={<Blog 
        user_id={user.user_id} 
        username={user.username} 
        posts={user.posts} 
        postsNumber={user.postsNumber}
        fetchPosts={fetchPosts}
        logout={logout}
        isAuth={isAuth}/>} />
      </Routes>
    </>
  )
}

export default App
