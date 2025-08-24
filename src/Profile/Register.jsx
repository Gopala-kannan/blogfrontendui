import React,{ useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'  
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

function Register() {

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password: '',
        confirm_password:'',
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    };

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (formData.password !== formData.confirm_password){
            toast.danger("password do not match");
            return;
        }
        try{
            const res = await axios.post('https://blogbackendserver-590e.onrender.com/api/register/', formData)
            toast.success(res.data.message);
            setTimeout(()=>{
                navigate('/login');
            }, 1000)
        }catch(err){
            toast.error(err.response.data.error?.confirm_password || err.response.data.message)
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <ToastContainer position='top-center' autoClose={3000} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full border border-gray-300 p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name='password'
                                className="w-full border border-gray-300 p-2 rounded"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name='confirm_password'
                                className="w-full border border-gray-300 p-2 rounded"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                    <p className='mt-4'>Already have an account? <Link to='/login' className='login text-blue-400'>Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default Register