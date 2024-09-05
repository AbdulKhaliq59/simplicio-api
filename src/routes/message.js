import express from "express";
import { getConversationUsers, getMessage, listAllMessages, listConversations, sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/isAdmin.js";

const router = express.Router();


router.post('/send-message', isAuthenticated, sendMessage)
router.get('/messages', isAuthenticated, getMessage)
router.get('/conversation-users', isAuthenticated, listConversations)
router.get('/all-messages', listAllMessages);
export default router;