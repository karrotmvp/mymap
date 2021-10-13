export class CreateUserDTO {
    constructor(user: any, token: string) {
        this.userName = user.nickname;
        this.profileImageUrl = user.profile_image_url;
        this.uniqueId = user.user_id;
        this.token = token;
    }

    private userName: string;
    
    private profileImageUrl: string;
    
    private uniqueId: string;

    private token: string;

    private userId: number;

    //getter
    public getUserName(): string {
        return this.userName;
    }
    public getProfileImageUrl(): string { 
        return this.profileImageUrl;
    }
    public getUniqueId(): string {
        return this.uniqueId;
    }
    public getToken(): string {
        return this.token;
    }
    public getUserId(): number {
        return this.userId;
    }
    public setUserId(userId: number) {
        this.userId = userId;
    }
}