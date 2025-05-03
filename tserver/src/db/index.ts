import mongoose, {Mongoose} from "mongoose";
import {dbName} from "../constant.js";
import dotenv from 'dotenv';

dotenv.config();

const createDb = async (): Promise<void> => {
    try {
        const dbUrl: string|undefined = process.env.DB_URL;
        const connectionInstances:Mongoose = await mongoose.connect(`${dbUrl}/${dbName}`)
        console.log("COnnection successful:", connectionInstances.connection.host);
    } catch (error:unknown) {
        console.log("Error on connection:", error);
        process.exit(1);
    }
}

export default createDb;