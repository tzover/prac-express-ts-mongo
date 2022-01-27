import express from "express";
import userRoutes from "./userRoutes";
import homeRoutes from "./homeRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/", homeRoutes);

export default router;
