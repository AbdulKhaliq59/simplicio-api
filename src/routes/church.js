import express from "express";
import {
  addChurch,
  deleteChurch,
  getAllChurches,
  getChurchById,
  updateChurch,
} from "../controllers/church.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

router.post("/", isAdmin, addChurch);
router.get("/", isAdmin, getAllChurches);
router.get("/:churchId", getChurchById);
router.put("/:churchId", updateChurch);
router.delete("/:churchId", deleteChurch);
export default router;
