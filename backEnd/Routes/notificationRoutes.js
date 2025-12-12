import express from "express";
import { getNotifications, markAsRead } from "../Controllers/notificationController.js";
// import auth from "../middlewares/auth.js";
// import { adminOnly } from "../middlewares/roles.js";

const router = express.Router();

router.get("/", getNotifications);
router.put("/:id/read", markAsRead);

export default router;
