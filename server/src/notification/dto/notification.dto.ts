export class Notification {
    constructor(userId: string, type: string) {
        this.userId = userId;
        this.type = type;        
    }

    userId: string;
    type: string;
}