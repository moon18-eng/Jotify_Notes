import pool from "../config/db.js";

export const getNotes = async (req, res) => {
  const userId = req.user.id
  try {
    const result = await pool.query
    ("SELECT * FROM notes WHERE user_id = $1 ORDER BY is_pinned DESC, id DESC",
    [userId]);
    
    res.status(200).json({ success: true, data: result.rows });

  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query
    ("SELECT * FROM notes WHERE id = $1 AND user_id = $2",
    [id,userId]);
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
  const { title, content, bg_color, text_color } = req.body;
  const userId = req.user.id
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content, bg_color, text_color,user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, content, bg_color || "white", text_color || "black",userId]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, bg_color, text_color } = req.body;
  const userId = req.user.id
  try {
    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2, bg_color=$3, text_color=$4 WHERE id=$5 AND user_id = $6 RETURNING *",
      [title, content, bg_color, text_color, id, userId]
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
  const userId = req.user.id
  try {
    const result = await pool.query
    ("DELETE FROM notes WHERE id=$1 AND user_id = $2 RETURNING *",
       [id,userId]);
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
  const userId = req.user.id
  try {
    const result = await pool.query(
      "UPDATE notes SET is_pinned=$1 WHERE id=$2 AND user_id = $3 RETURNING *",
      [is_pinned, id, userId]
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
