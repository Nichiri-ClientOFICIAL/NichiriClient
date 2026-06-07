import React, { useState, useEffect } from "react";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";

import {
    getCurrentUser,
    logoutUser,
} from "./api/auth";

function App() {

    const [view, setView] =
        useState<"login" | "register" | null>(null);

    const [user, setUser] =
        useState<{
            username: string;
            email: string;
        } | null>(null);

    useEffect(() => {

        const currentUser =
            getCurrentUser();

        if (currentUser) {
            setUser(currentUser);
        }

    }, []);

    const handleLogout = () => {

        logoutUser();

        setUser(null);

        alert("Logged out successfully");
    };

    return (

        <div className="app">

            {/* NAVBAR */}

            <nav className="navbar">

                <div className="logo">
                    Nichiri<span>Client</span>
                </div>

                <ul className="nav-links">

                    <li>
                        <a href="#home">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#features">
                            Features
                        </a>
                    </li>

                    <li>
                        <a href="#stats">
                            Stats
                        </a>
                    </li>

                    <li>
                        <a href="#download">
                            Download
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            Discord
                        </a>
                    </li>

                </ul>

                <div className="nav-buttons">

                    {!user && (

                        <button
                            className="login-btn"
                            onClick={() => setView("login")}
                        >
                            Login
                        </button>

                    )}

                    {user && (

                        <button
                            className="login-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    )}

                    <button
                        className="download-btn"
                    >
                        Download
                    </button>

                </div>

            </nav>

            {/* AUTH MODAL */}

            {!user && view && (

                <div className="auth-overlay">

                    <div className="auth-container">

                        <button
                            className="close-btn"
                            onClick={() => setView(null)}
                        >
                            ×
                        </button>

                        <nav className="auth-nav">

                            <button
                                className={
                                    view === "login"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setView("login")
                                }
                            >
                                Login
                            </button>

                            <button
                                className={
                                    view === "register"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setView("register")
                                }
                            >
                                Register
                            </button>

                        </nav>

                        {view === "login" && (
                            <Login />
                        )}

                        {view === "register" && (
                            <Register />
                        )}

                    </div>

                </div>

            )}

            {/* HERO */}

            <section
                className="hero"
                id="home"
            >

                <div className="hero-content">

                    {user && (

                        <div className="dashboard-banner">

                            <span className="dashboard-tag">
                                CONNECTED
                            </span>

                            <h2>
                                Welcome back,
                                <span>
                                    {" "}
                                    {user.username}
                                </span>
                            </h2>

                            <p>
                                Logged in as:
                                {" "}
                                {user.email}
                            </p>

                            <div className="dashboard-actions">

                                <button className="primary-btn">
                                    Launch Client
                                </button>

                                <button className="secondary-btn">
                                    Open Dashboard
                                </button>

                            </div>

                        </div>

                    )}

                    <span className="hero-mini-title">
                        THE NEXT GENERATION PVP CLIENT
                    </span>

                    <h1>
                        Nichiri <span>Client</span>
                    </h1>

                    <p>
                        Precision. Performance.
                        Darkness.
                        <br />
                        Built for elite Minecraft
                        PvP players.
                    </p>

                    <div className="hero-buttons">

                        <button className="primary-btn">
                            Download Now
                        </button>

                        <button className="secondary-btn">
                            Learn More
                        </button>

                    </div>

                </div>

            </section>

            {/* FEATURES */}

            <section
                className="features"
                id="features"
            >

                <h2>
                    Features
                </h2>

                <div className="features-grid">

                    <div className="feature-card">

                        <h3>
                            FPS Boost
                        </h3>

                        <p>
                            Optimized rendering
                            for maximum FPS and
                            smooth gameplay.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            Combat Modules
                        </h3>

                        <p>
                            Advanced PvP
                            enhancements designed
                            for competitive
                            players.
                        </p>

                    </div>

                    <div className="feature-card">

                        <h3>
                            Modern UI
                        </h3>

                        <p>
                            Clean dark interface
                            inspired by flame and
                            shadow aesthetics.
                        </p>

                    </div>

                </div>

            </section>

            {/* STATS */}

            <section
                className="stats"
                id="stats"
            >

                <div className="stat-card">

                    <h3>
                        120+
                    </h3>

                    <p>
                        Custom Features
                    </p>

                </div>

                <div className="stat-card">

                    <h3>
                        240 FPS
                    </h3>

                    <p>
                        Optimized Performance
                    </p>

                </div>

                <div className="stat-card">

                    <h3>
                        24/7
                    </h3>

                    <p>
                        Community Support
                    </p>

                </div>

            </section>

            {/* CTA */}

            <section
                className="cta-section"
                id="download"
            >

                <h2>
                    Ready to dominate?
                </h2>

                <p>
                    Download Nichiri Client
                    and enter a new era of PvP.
                </p>

                <button className="cta-button">
                    Download Client
                </button>

            </section>

        </div>

    );
}

export default App;