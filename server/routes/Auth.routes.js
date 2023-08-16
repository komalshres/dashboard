import { Router } from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/Auth.controllers.js";
import Auth from "../middleware/auth.js";
const router = Router();

/** POST Methods */
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/login/:username").get(loginUser);
router.route("/auth/profile/").get(Auth, getProfile);

export default router;
