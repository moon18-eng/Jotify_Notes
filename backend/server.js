import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import noteRouter from "./src/routes/noteRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/notes", noteRouter);

// Run CREATE TABLE once when server starts
// Run CREATE TABLE queries once when server starts
const createTables = async () => {
  try {
    // 1. Create users table first
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255),
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created or already exists");

    // 2. Create notes table with foreign key reference
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        bg_color VARCHAR(20) DEFAULT 'white',
        text_color VARCHAR(20) DEFAULT 'black',
        is_pinned BOOLEAN DEFAULT FALSE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("Notes table created or already exists");

    // 3. Ensure user_id column exists if the notes table was created previously without it
    await pool.query(`
      ALTER TABLE notes 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
    `);

    // Ensure legacy column is removed if present
    await pool.query(`ALTER TABLE notes DROP COLUMN IF EXISTS text_size`);
    console.log("Database tables successfully initialized");

  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
};

createTables();
app.get("/", (req, res) => res.send("Backend running!"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
