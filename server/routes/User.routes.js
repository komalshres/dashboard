import { Router } from "express";
import Auth from "../middleware/auth.js";
import { getUsers, updateUser } from "../controllers/User.controllers.js";

const router = Router();

router.route("/users/").get(Auth, getUsers);
router.route("/user/:id/update").put(Auth, updateUser);

export default router;
