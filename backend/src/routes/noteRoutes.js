import express from "express";
import { getNotes, getNote, createNote, updateNote, deleteNote, pinNote } from "../controllers/noteControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken)

router.get("/",getNotes);
router.get("/:id",getNote);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
router.patch("/:id/pin", pinNote);

export default router;


