import express from "express";
import { updateUserRole,getAllUsers } from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get('/all',getAllUsers)
router.put("/:userId/update-role",isAdmin, updateUserRole);

export default router;
