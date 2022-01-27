import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes/todo";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(json());
app.use(todoRouter);

mongoose.connect(
    `${MONGO_URI}/todo`,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("connected to database");
    }
);

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
