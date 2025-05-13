import { getMessage, markAsRead, sentMessage } from "../controllers/message.controller.ts";
import { upload } from "../middelwares/multer.middelware.ts";
import { verifyJWT } from "../middelwares/auth.middelware.ts";
import { Router } from "express";

const router = Router();

router.route("/sentMessage").post(
    verifyJWT,
    upload.single('file'),
    sentMessage
)

router.route("/getMessage/:chatId").get(
    verifyJWT,
    getMessage
);

router.route("/markAsRead/:chatId").put(
    verifyJWT,
    markAsRead);


export default router;