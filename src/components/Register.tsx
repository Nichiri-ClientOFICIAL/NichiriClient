import React, { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await registerUser(
                username,
                email,
                password
            );

            console.log("User registered:", data);

            // GUARDAR TOKEN
            if (data.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );
            }

            // GUARDAR USER
            localStorage.setItem(
                "user",
                JSON.stringify({
                    username,
                    email,
                })
            );

            alert("Registro exitoso!");

            // RECARGAR
            window.location.reload();

        } catch (error) {
            console.error(error);

            alert(
                "Error al registrar usuario"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
                required
            />

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
                    ? "Creating account..."
                    : "Register"}
            </button>
        </form>
    );
};

export default Register;