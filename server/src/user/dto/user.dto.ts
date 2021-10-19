export class UserDTO {
    constructor(userId: number, userName: string, profileImageUrl: string, token: string) {
        this.userId = userId;
        this.userName = userName;
        this.profileImageUrl = profileImageUrl;
        this.token = token;
    }

    private userId: number;

    private userName: string;

    private profileImageUrl: string;

    private token: string
}