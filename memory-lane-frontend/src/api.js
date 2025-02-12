import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token to requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = token;
    return req;
});

export const register = (user) => API.post("/auth/register", user);
export const login = (user) => API.post("/auth/login", user);
export const addMemory = (memory) => API.post("/memory/add-memory", memory);
export const getMemories = () => API.get("/memory/memories");
