import { Notification } from "./notification.dto";

export class VerificationNotificationEvent extends Notification {
    constructor(userId: string, type: string, id: number) {
        super(userId, type, null);
        this.id = id;
    }

    id: number;
}