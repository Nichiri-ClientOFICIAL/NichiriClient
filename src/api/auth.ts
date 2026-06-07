import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
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
    const response = await API.post(
        "/auth/register",
        {
            username,
            email,
            password,
        }
    );

    return response.data;
};

// LOGIN
export const loginUser = async (
    email: string,
    password: string
) => {
    const response = await API.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
};

// LOGOUT
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// GET USER
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");

    return user
        ? JSON.parse(user)
        : null;
};

export default API;