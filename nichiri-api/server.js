const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);

/* =========================
   DATABASE
========================= */

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(
            "✅ MongoDB connected"
        );
    })
    .catch((err) => {
        console.error(
            "❌ MongoDB Error:",
            err.message
        );
    });

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
    res.send("Nichiri API Running");
});

/* =========================
   SERVER
========================= */

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on port ${PORT}`
    );
});