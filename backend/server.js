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
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        bg_color VARCHAR(20) DEFAULT 'white',
        text_color VARCHAR(20) DEFAULT 'black',
        text_size INT DEFAULT 14,
        is_pinned BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("Notes table created or already exists");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
};

createTable();

app.get("/", (req, res) => res.send("Backend running!"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
