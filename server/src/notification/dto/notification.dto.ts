export class Notification {
    constructor(userId: string, type: string, data: any) {
        this.userId = userId;
        this.type = type;   
        this.data = data;     
    }

    userId: string;
    type: string;
    data: any;
}