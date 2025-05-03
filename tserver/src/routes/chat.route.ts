import { Router } from "express";
import { verifyJWT } from "../middelwares/auth.middelware.ts";
//import { upload } from "../middelwares/multer.middelware.ts";
import { getUserChat, createChat } from "../controllers/chat.controller.ts";


const router = Router();

router.route("/createChat").post(verifyJWT, createChat);
router.route("/getChatByUser").post(verifyJWT, getUserChat);


export default router;