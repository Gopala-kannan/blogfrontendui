import React from 'react'
import './App.css'
import Home from './Pages/Home'
import Register from './Profile/Register'
import Login from './Profile/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './Components/Blog'
import Post from './Components/Post'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
