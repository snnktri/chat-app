import connectDb from './db/index.js';
import { app } from './app.js';
import dotenv from 'dotenv';
import http from 'http'
import { initSocket } from './socket.ts';


dotenv.config({
    path: './.env',
});

const port:string|number = process.env.PORT || 8050
connectDb() 
    .then(() => {

        const server = http.createServer(app);
        const io = initSocket(server);

        server.listen(port, () => {
            console.log(`⚙️ Server is running at port : ${port || 8050}`);
        });
    })
    .catch((error:unknown) => {
        console.log("MONGO db connection failed !!!", error);
    });
