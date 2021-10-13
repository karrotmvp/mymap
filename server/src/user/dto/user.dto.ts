export class UserDTO {
    constructor(userId: number, userName: string, profileImageUrl: string) {
        this.userId = userId;
        this.userName = userName;
        this.profileImageUrl = profileImageUrl;
    }

    private userId: number;

    private userName: string;

    private profileImageUrl: string;
}