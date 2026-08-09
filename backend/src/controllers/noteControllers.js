import pool from "../config/db.js";

export const getNotes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Notes not found" });
    }
    res.status(200).json({ success: true, data: result.rows });

  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching note:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createNote = async (req, res) => {
  const { title, content, Bg_color, text_color, text_size } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content, Bg_color, text_color, text_size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, content, Bg_color || "white", text_color || "black", text_size || 14]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, Bg_color, text_color, text_size } = req.body;
  try {
    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2, bg_color=$3, text_color=$4, text_size=$5 WHERE id=$6 RETURNING *",
      [title, content, Bg_color, text_color, text_size, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM notes WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const pinNote = async (req, res) => {
  const { id } = req.params;
  const { is_pinned } = req.body;
  try {
    const result = await pool.query(
      "UPDATE notes SET is_pinned=$1 WHERE id=$2 RETURNING *",
      [is_pinned, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error pinning note:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
