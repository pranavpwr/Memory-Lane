import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api",
});

// Add a request interceptor to add the token to all requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
});

export const register = (user) => API.post("/auth/register", user);
export const login = (user) => API.post("/auth/login", user);
export const addMemory = (memoryData) => API.post("/memory/add-memory", memoryData);
export const getMemories = () => API.get("/memory/memories");
export const deleteMemory = (id) => API.delete(`/memory/delete/${id}`);
