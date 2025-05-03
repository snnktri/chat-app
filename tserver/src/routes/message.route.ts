import { getMessage, sentMessage } from "../controllers/message.controller.ts";
import { upload } from "../middelwares/multer.middelware.ts";
import { verifyJWT } from "../middelwares/auth.middelware.ts";
import { Router } from "express";

const router = Router();

router.route("/sentMessage").post(
    verifyJWT,
    upload.single('file'),
    sentMessage
)

router.route("/getMessage").post(
    verifyJWT,
    getMessage
)


export default router;