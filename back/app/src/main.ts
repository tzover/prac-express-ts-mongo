import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./routes/v3";
import path from "path";
import layouts from "express-ejs-layouts";

dotenv.config();
connectDB("todos");

const app: express.Express = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use("/", router);

app.use(layouts);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", (req, res) => {
    const data = { message: "Hello" };
    res.send(data);
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
