import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
