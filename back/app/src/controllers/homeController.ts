import express, { Request, Response } from "express";

export default {
    index: (req: Request, res: Response) => {
        res.send("<h1>Top Page</h1>");
    },
};
