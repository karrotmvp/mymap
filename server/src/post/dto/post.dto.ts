import { ApiProperty } from "@nestjs/swagger";
import { CoordinatesDTO } from "src/place/dto/coordinates.dto";
import { UserDTO } from "src/user/dto/user.dto";
import { Post } from "../entities/post.entity";
import { PinDTO } from "./pin.dto";

export class PostDTO {
    constructor(post: Post, user: UserDTO, detailPins: PinDTO[], coordinates: CoordinatesDTO, savedNum: number) {
        this.postId = post.getPostId();
        this.user = user;
        this.title = post.getTitle();
        this.contents = post.getContents();
        this.regionId = post.getRegionId();
        this.regionName = post.getRegionName();
        this.share = post.getShare();
        this.pins = detailPins;
        this.coordinates = coordinates
        this.savedNum = savedNum;
        this.createdAt = post.createdAt;
    }

    @ApiProperty({ example: 1 })
    postId: number;
    @ApiProperty()
    user: UserDTO;
    @ApiProperty({ example: "테마 테스트" })
    title: string;
    @ApiProperty({ example: "테마 소개" })
    contents: string;
    @ApiProperty({ example: "6530459d189b" })
    regionId: string;
    @ApiProperty({ example: "역삼1동" })
    regionName: string;
    @ApiProperty({ example: true })
    share: boolean;
    @ApiProperty()
    coordinates: CoordinatesDTO
    @ApiProperty({ type: [PinDTO] })
    pins: PinDTO[];
    @ApiProperty({ example: false })
    saved: boolean;
    @ApiProperty({ example: 0 })
    savedNum: number;
    @ApiProperty()
    createdAt: Date;

    public setSaved(saved: boolean) {
        this.saved = saved;
    }
}