import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Blog() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Clean up preview URL to avoid memory leaks
    React.useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = new FormData();
        blogData.append('title', formData.title);
        blogData.append('content', formData.content);
        if (imageFile) {
            blogData.append('image', imageFile);
        }

        try {
            await axios.post('https://blogbackendserver-590e.onrender.com/api/blog/', blogData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });

            navigate('/post');
        } catch (err) {
            console.error('Error posting blog:', err);
            setError('Failed to post blog. Please try again.');
        }
    };

    return (
        <>
        <Navbar />
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl mb-32">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>

                {error && (
                    <p className="mb-4 text-red-500 font-semibold text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="blog-title" className="block mb-1 font-medium">Title</label>
                        <input
                            id="blog-title"
                            type="text"
                            name="title"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter blog title"
                            title="Blog Title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="blog-content" className="block mb-1 font-medium">Content</label>
                        <textarea
                            id="blog-content"
                            name="content"
                            rows="5"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            placeholder="Write your blog content here"
                            title="Blog Content"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="blog-image" className="block mb-1 font-medium">Upload Image</label>
                        <input
                            id="blog-image"
                            type="file"
                            accept="image/*"
                            className="w-full"
                            onChange={handleImageChange}
                            placeholder="Choose an image"
                            title="Blog Image"
                        />
                    </div>

                    {preview && (
                        <div className="mb-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-40 object-cover rounded"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Post Blog
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Blog;

