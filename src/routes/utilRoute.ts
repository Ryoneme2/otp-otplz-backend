import express from "express";
import { auth } from '../middlewares/userAuth'
import { generateToken } from '../controllers/utilController'

const router = express.Router();

router.get("/generate_key",auth, generateToken);


export default router;