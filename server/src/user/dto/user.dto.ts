import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
    constructor(userId: number, userName: string, profileImageUrl: string, token: string, regionName: string) {
        this.userId = userId;
        this.userName = userName;
        this.profileImageUrl = profileImageUrl;
        this.token = token;
        this.regionName = regionName;
    }

    @ApiProperty({ example: 1 })
    private userId: number;

    @ApiProperty({ example: 'team1test' })
    private userName: string;

    @ApiProperty()
    private profileImageUrl: string;

    @ApiProperty()
    private token: string

    @ApiProperty()
    private regionName: string

    public getUserId() {
        return this.userId;
    }
    public getUserName() {
        return this.userName;
    }
}