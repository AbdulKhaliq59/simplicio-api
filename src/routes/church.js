import express from "express";
import {
  addChurch,
  deleteChurch,
  getAllChurches,
  getChurchById,
  updateChurch,
} from "../controllers/church.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import upload from "../utils/upload.js";
const router = express.Router();

router.post("/", isAdmin, upload.single("logo"), addChurch);
router.get("/", isAdmin, getAllChurches);
router.get("/:churchId", getChurchById);
router.put("/:churchId", updateChurch);
router.delete("/:churchId", deleteChurch);
export default router;
