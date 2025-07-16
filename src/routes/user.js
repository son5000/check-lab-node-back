import { Router } from "express";
import userLogin from "../controllers/user/login.js";

const router = Router();

router.post("/login", userLogin);

export default router;
