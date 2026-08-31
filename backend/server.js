import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import noteRouter from "./src/routes/noteRoutes.js";
import authRouter from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/notes", noteRouter);
app.use("/auth", authRouter);

// Run CREATE TABLE once when server starts
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255),
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255),
        content TEXT,
        bg_color VARCHAR(20) DEFAULT 'white',
        text_color VARCHAR(20) DEFAULT 'black',
        is_pinned BOOLEAN DEFAULT FALSE
      );
    `);

    
    console.log("Notes table created or already exists");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
};

createTables();

app.get("/", (req, res) => res.send("Backend running!"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
