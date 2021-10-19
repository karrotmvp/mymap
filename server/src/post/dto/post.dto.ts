import { CoordinatesDTO } from "src/place/dto/coordinates.dto";
import { UserDTO } from "src/user/dto/user.dto";
import { Post } from "../entities/post.entity";
import { PinDTO } from "./pin.dto";

export class PostDTO {
    constructor(post: Post, user: UserDTO, detailPins: PinDTO[], coordinates: CoordinatesDTO) {
        this.postId = post.getPostId();
        this.user = user;
        this.title = post.getTitle();
        this.contents = post.getContents();
        this.regionId = post.getRegionId();
        this.regionName = post.getRegionName();
        this.share = post.getShare();
        this.pins = detailPins;
        this.coordinates = coordinates
    }

    postId: number;
    user: UserDTO;
    title: string;
    contents: string;
    regionId: string;
    regionName: string;
    share: boolean;
    coordinates: CoordinatesDTO
    pins: PinDTO[];
    saved: boolean;

    public setSaved(saved: boolean) {
        this.saved = saved;
    }
}