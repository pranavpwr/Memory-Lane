import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(form);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
