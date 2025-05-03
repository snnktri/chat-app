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

import userRoute from "./routes/user.route.js";
app.use("/api/v1/user", userRoute);

export { app };