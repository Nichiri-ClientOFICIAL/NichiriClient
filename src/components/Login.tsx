import React, { useState } from "react";
import { loginUser } from "../api/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await loginUser(
                email,
                password
            );

            console.log(
                "User logged in:",
                data
            );

            // GUARDAR TOKEN
            if (data.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );
            }

            // GUARDAR USER
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            alert("Login successful!");

            // RECARGAR APP
            window.location.reload();

        } catch (error) {
            console.error(error);

            alert(
                "Invalid credentials"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome Back</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                required
            />

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Signing in..."
                    : "Login"}
            </button>
        </form>
    );
};

export default Login;