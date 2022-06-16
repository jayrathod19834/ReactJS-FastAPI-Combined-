import { NotificationManager } from "./index";

const displayNotification = (entityName, message, status) => {
    if (status === "success") {
        NotificationManager.success(
            message,
            entityName,
            3000,
            null,
            null,
            "filled"
        );
    } else if (status === "warning") {
        NotificationManager.warning(
            message,
            entityName,
            3000,
            null,
            null,
            "filled"
        )

    }

    else {
        NotificationManager.error(
            message,
            entityName,
            3000,
            null,
            null,
            "filled"
        );
    }
}

export default displayNotification