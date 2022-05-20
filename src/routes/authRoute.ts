import express from "express";
import { login, addUser } from '../controllers/userController'

const router = express.Router();

router.post("/login", login);
router.post("/register", addUser);

export default router;