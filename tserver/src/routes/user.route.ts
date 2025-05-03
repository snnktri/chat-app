//import { app } from "../app.js";
import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controllers.ts";
import { upload } from "../middelwares/multer.middelware.js";
import { verifyJWT } from "../middelwares/auth.middelware.js";

const router = Router();

router.route("/register").post(upload.single(
   "profile"
), registerUser);

router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);


export default router;