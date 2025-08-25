import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://blogbackendserver-590e.onrender.com/api/details/')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched blogs:", data);
                // Ensure data is always an array
                setBlogs(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    return (
        <>
            <Navbar />
            <section className="bg-gradient-to-r from-blue-100 to-blue-300 py-16 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MyBlog</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Share your thoughts, stories, and ideas with the world.
                    </p>
                    <Link to="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                        Create Your First Post
                    </Link>
                </div>
            </section>
            <section className="bg-blue-200">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl pt-14 font-extrabold text-center text-gray-800 mb-10">
                        All Blog Posts
                    </h2>

                    {blogs.length === 0 ? (
                        <p className="text-center text-red-500 text-lg font-bold">No blog posts found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 cursor-pointer">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="group bg-white border border-blue-200 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ease-in-out overflow-hidden"
                                >
                                    {blog.image && (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                        />
                                    )}

                                    <div className="p-5 bg-gradient-to-br from-white via-blue-50 to-blue-100 group-hover:from-blue-50 group-hover:via-purple-100 group-hover:to-pink-100 transition-all duration-500 ease-in-out">
                                        <h3 className="text-2xl font-bold text-purple-700 group-hover:text-pink-600 mb-2 line-clamp-2 transition-colors duration-300">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-700 text-sm mb-4 line-clamp-3 group-hover:text-gray-900 transition-colors duration-300">
                                            {blog.content.length > 150
                                                ? blog.content.slice(0, 150) + '...'
                                                : blog.content}
                                        </p>

                                        <Link
                                            className="inline-block text-blue-700 font-semibold group-hover:text-pink-600 hover:underline transition-colors duration-300"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </section>
            <Footer />

        </>
    );
}

export default Home;
