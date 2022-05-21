import express from "express";
import { auth } from '../middlewares/userAuth'
import { generateToken, revokeToken } from '../controllers/tokenController'

const router = express.Router();

router.get("/generate_key",auth, generateToken);
router.get("/revoke_key",auth, revokeToken);


export default router;