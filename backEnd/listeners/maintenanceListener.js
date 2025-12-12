import maintenanceEmitter from "../utils/maintenanceEmitter.js";
import MaintenanceRule from "../Models/MaintenanceRule.js";
import Notification from "../Models/Notification.js";

maintenanceEmitter.on("check_maintenance", async ({ targetType, targetId, currentKm }) => {
    try {
        const rules = await MaintenanceRule.find({ target: targetType });

        for (const rule of rules) {
            if (rule.intervalType === "km") {

                if (currentKm >= rule.intervalValue) {
                    await Notification.create({
                        type: "maintenance",
                        message: `Maintenance due: ${rule.description}`,
                        [targetType]: targetId
                    });
                }

            }
        }

    } catch (err) {
        console.log("Maintenance check error:", err);
    }
});
