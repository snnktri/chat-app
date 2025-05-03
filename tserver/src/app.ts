import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());

app.use(express.json({
    limit: '6mb'
}));

app.use(express.urlencoded({
    limit: '6mb'
}));

app.use(express.static("public"));

app.use(cookieParser());

//routes goes here

import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.ts";
import chatRouteer from "./routes/chat.route.ts";


app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("api/v1/chat", chatRouteer);

export { app };