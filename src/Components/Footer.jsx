import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-2xl font-bold">MyBlog</div>

        <div className="space-x-6">
          <a className="hover:text-gray-300 transition duration-300">Home</a>
          <a className="hover:text-gray-300 transition duration-300">About</a>
          <a className="hover:text-gray-300 transition duration-300">Contact</a>
          <a className="hover:text-gray-300 transition duration-300">Privacy</a>
        </div>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>

      
      <div className="text-center text-sm mt-6 text-white/80">
        © gopala-kannan | {new Date().getFullYear()} | MyBlog. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;