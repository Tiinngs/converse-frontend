import { Notifications } from "@mantine/notifications";

export default (text, color) => {
    return Notifications.show({
        title: text,
        message: "",
        autoClose: 3000,
        withCloseButton: true,
        color: color,
    });
};
