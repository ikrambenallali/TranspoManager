import Notification from "../Models/Notification.js";

export const getNotifications = async (req, res) => {
    const notifications = await Notification.find()
        .sort({ createdAt: -1 })
        .populate("truck trailer tire");

    res.status(200).json({
        success: true,
        count: notifications.length,
        data: notifications
    });
};

export const markAsRead = async (req, res) => {
    const { id } = req.params;

    const notif = await Notification.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
    );

    res.status(200).json({ success: true, data: notif });
};
