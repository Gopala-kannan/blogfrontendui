import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkToken();
    window.addEventListener('storage', checkToken); 

    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('https://blogbackendserver-590e.onrender.com/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (err) {
      toast.error('Logout failed: ' + err.message);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <nav className="container-fluid mx-auto bg-black border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/home" className="text-xl font-bold text-white">MyBlog</Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/home" className="text-white hover:text-gray-600">Home</Link>
            <Link to="/post" className="text-white hover:text-gray-600">Posts</Link>
            <Link to="/blog" className="text-white hover:text-gray-600">Create Post</Link>
          </div>

          <div className="hidden md:flex space-x-4">

              <button
              
                onClick={handleLogout}
                className="text-white font-bold cursor-pointer bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-700"
              ><i className="fa-solid fa-user" style={{marginRight:'10px'}}></i>
                Logout
              </button>
            
          </div>

          <button id="mobile-menu-btn" className="md:hidden text-white" title="Open mobile menu" aria-label="Open mobile menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="md:hidden hidden px-4 pt-3 pb-4 space-y-2">
          <Link to="/" className="block text-gray-300 hover:text-blue-400">Home</Link>
          <Link to="/posts" className="block text-gray-300 hover:text-blue-400">Posts</Link>
          <Link to="/blog" className="block text-gray-300 hover:text-blue-400">Create Post</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
