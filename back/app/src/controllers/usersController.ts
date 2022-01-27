import express, { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export default {
    index: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find().exec();
            res.locals.users = users;
            next();
        } catch (err) {
            next(err);
        }
    },
    indexView: (req: Request, res: Response) => {
        res.render("users/index");
    },
    new: (req: Request, res: Response) => {
        res.render("users/new");
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const UserRef = await new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                age: req.body.age,
                sex: req.body.sex,
            });

            // console.log(userParams);
            const userParam = await UserRef.save();
            console.log(userParam);

            if (!userParam) throw Error("error");

            res.redirect("/users");
            res.status(201).send(userParam);
        } catch (error) {
            res.status(400).json({ msg: error });
        }
    },
    redirectView: async (req: Request, res: Response, next: NextFunction) => {
        const redirect = await res.locals.redirect;
        if (redirect) {
            res.redirect(redirect);
        } else {
            next();
        }
    },
    edit: async (req: Request, res: Response, next: NextFunction) => {
        const userId: string = req.params.id;
        try {
            console.log(userId);
            const user = await User.findById(userId);
            res.locals.user = user;
            next();
        } catch (error) {
            res.status(400).json({ msg: error });
        }
    },
    editView: (req: Request, res: Response) => {
        res.render("/users/:id/edit");
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        const userId: string = req.params._id;

        const userParams = req.body as User;
        // const userParams = req.body;

        try {
            await User.findByIdAndUpdate(userId, {
                $set: userParams,
            });
            res.redirect("/users");
            next();
        } catch (err) {
            next(err);
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params);
        const userId: string = req.params._id;

        try {
            await User.findByIdAndRemove(userId);
            res.redirect("/users");
            next();
        } catch (err) {
            next(err);
        }
    },
};
