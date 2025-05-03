//import { app } from "../app.js";
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { upload } from "../middelwares/multer.middelware.js";

const router = Router();

router.route("/register").post(upload.single(
   "profile"
), registerUser);

router.route("/login").post(loginUser);


export default router;