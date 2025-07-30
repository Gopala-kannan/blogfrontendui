import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Post() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://blog-jet-two-63.vercel.app/api/details/')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto mt-12 px-4 mb-10">
                <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
                    All Blog Posts
                </h2>

                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No blog posts found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 cursor-pointer">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="group bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-indigo-100 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ease-in-out overflow-hidden"
                            >
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}

                                <div className="p-5">
                                    <h3 className="text-2xl font-bold text-indigo-700 group-hover:text-pink-600 mb-3 transition-colors duration-300 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm mb-4 group-hover:text-gray-900 transition-colors duration-300 line-clamp-3">
                                        {blog.content.length > 140
                                            ? blog.content.slice(0, 140) + '...'
                                            : blog.content}
                                    </p>
                                    <Link
                                        className="inline-block text-blue-700 group-hover:text-pink-600 font-semibold hover:underline transition-colors duration-300"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>

    );
}

export default Post;
