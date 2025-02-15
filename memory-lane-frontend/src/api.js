import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api",
});

// Only add token interceptor for protected routes
const protectedAPI = axios.create({
    baseURL: "http://localhost:5001/api",
});

protectedAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = '/login';
        return Promise.reject('No auth token');
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const register = async (formData) => {
    try {
        const response = await API.post("/users/register", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Registration failed. Please try again.");
    }
};

export const login = async (formData) => {
    try {
        const response = await API.post("/users/login", formData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Login failed. Please try again.");
    }
};

// Use protectedAPI for authenticated routes
export const getMemories = async () => {
    try {
        const response = await protectedAPI.get("/memory/memories");
        if (!response.data) {
            throw new Error("No data received from server");
        }
        
        const memories = (response.data.memories || []).map(memory => ({
            ...memory,
            imageUrl: memory.media?.url || null,
            previewUrl: memory.media?.url || null,
            mediaType: memory.media?.resource_type || null
        }));
        
        return {
            success: response.data.success,
            message: response.data.message,
            memories
        };
    } catch (error) {
        console.error("Memory fetch error:", error);
        throw new Error(
            error.response?.data?.error || 
            error.message || 
            "Failed to fetch memories"
        );
    }
};

export const addMemory = async (formData) => {
    try {
        const response = await protectedAPI.post("/memory/add-memory", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to add memory");
    }
};

export const deleteMemory = (id) => protectedAPI.delete(`/memory/delete/${id}`);