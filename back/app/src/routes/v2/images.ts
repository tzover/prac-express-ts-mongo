import express, { Request, Response, NextFunction } from "express";
import Image from "../../models/image";

const router = express.Router();

// params, query, body,
// query => (select, sort, page, limit)

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body, req.query);
        const images = await Image.find().exec();
        res.status(200).send(images);
        // .json({
        //     success: true,
        //     msg: "Get All data",
        //     data: images,
        // })
    } catch (err) {
        next(err);
    }
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);

    res.status(200).json({
        success: true,
        msg: `Get a data ${req.params.id}`,
    });
});

router.get(
    "/:id/:id2/test",
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params);
        const reqparams = req.params;
        console.log(reqparams);

        res.status(200).json({
            success: true,
            msg: `Get a data ${req.params.id} & ${req.params.id2}`,
        });
    }
);

router.post("/", async (req: Request, res: Response) => {
    const { folder_path, image_name } = req.body;

    try {
        const newImage = Image.build({
            folder_path,
            image_name,
        });
        const image = await newImage.save();
        console.log(image);
        if (!image) throw Error("error");

        res.status(201)
            .json({
                success: true,
                data: image,
            })
            .send(image);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
});

// app.put("/:id", (req, res, next) => {
//     res.status(200).json({
//         success: true,
//         msg: "Change a data",
//     });
// });
// app.delete("/", (req, res, next) => {
//     res.status(200).json({
//         success: true,
//         msg: "Delete a data",
//     });
// });

export default router;
