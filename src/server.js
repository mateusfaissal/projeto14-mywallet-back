import express from "express";
import cors from "cors";
import router from "../src/routes/index.routes.js"
import { MongoClient } from "mongodb";
import dotenv from "dotenv";


const server = express();
server.use(cors());
server.use(express.json());
server.use(router)

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {

    await mongoClient.connect()
    console.log("MongoDB connected!")
} catch (err) {
    console.log(err.message)
}

export const db = mongoClient.db()


const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));