import express from "express";
import { addChurch } from "../controllers/church.controller.js";

const router = express.Router();

router.post("/", addChurch);

export default router;
