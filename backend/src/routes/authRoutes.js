import express from "express"
import { LogIn, SignUp } from "../controllers/authControllers";

const router = express.Router();

router.post('/logIn',LogIn)
router.post('/signUp',SignUp)

export default router