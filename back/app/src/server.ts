import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./routes/v1/index";
import imageRouter from "./routes/v2/images";

dotenv.config();
connectDB("practice");

const app: express.Express = express();

// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));
// JSONオブジェクトの受信設定
app.use(express.json());

// ルーティング
app.use("/v1", router);
app.use("/v2", imageRouter);

// CRUD
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from node");
});

// ポート指定
const PORT = process.env.PORT || 3000;

// APIサーバ起動
app.listen(PORT, () => {
    // console.log(PORT);
    console.log(
        `App listening on port ${PORT}! with mode ${process.env.NODE_ENV}`
    );
});
