import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.MODE === "development"
        ? "http://localhost:5000/api" // Local para dev
        : "https://nichiri-web.vercel.app/api", // Producción
});

// AUTO ATTACH TOKEN
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// REGISTER
export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    try {
        const response = await API.post("/auth/register", {
            username,
            email,
            password,
        });
        return response.data;
    } catch (err: any) {
        console.error("Error registering user:", err.response?.data || err.message);
        throw err.response?.data || err;
    }
};

// LOGIN
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await API.post("/auth/login", { email, password });
        return response.data;
    } catch (err: any) {
        console.error("Error logging in:", err.response?.data || err.message);
        throw err.response?.data || err;
    }
};

// LOGOUT
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// GET USER
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export default API;