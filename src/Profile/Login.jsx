import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        username:'',
        password: '',
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    };

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('https://blogbackendserver-590e.onrender.com/api/login/',{
                username: formData.username,
                password: formData.password
            })
            toast.success(res.data.message);
            setTimeout(()=>{
                navigate('/home');
            }, 1000)
        }catch(err){
            toast.error(err.response.data.message || "Login failed. Please try again.")
        }
    }
  return (
    <>
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <ToastContainer position='top-center' autoClose={3000} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">User Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"

                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
    </>
  )
}

export default Login