import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/api/v1/user/login", input);
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.name);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <form onSubmit={handleLogin} className="mt-4">
                    <div>
                        <label className="block" htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            id="password"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
