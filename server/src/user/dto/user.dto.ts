export class UserDTO {
    constructor(userId: number, userName: string, profileImageUrl: string, token: string, regionName: string) {
        this.userId = userId;
        this.userName = userName;
        this.profileImageUrl = profileImageUrl;
        this.token = token;
    }

    private userId: number;

    private userName: string;

    private profileImageUrl: string;

    private token: string

    private regionName: string

    public getUserId() {
        return this.userId;
    }
    public getUserName() {
        return this.userName;
    }
}