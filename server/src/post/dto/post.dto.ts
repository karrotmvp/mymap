import { UserDTO } from "src/user/dto/user.dto";
import { Post } from "../entities/post.entity";
import { PinDTO } from "./pin.dto";

export class PostDTO {
    constructor(post: Post, user: UserDTO, detailPins: PinDTO[]) {
        this.postId = post.getPostId();
        this.user = user;
        this.title = post.getTitle();
        this.regionId = post.getRegionId();
        this.share = post.getShare();
        this.pins = detailPins;
    }

    postId: number;
    user: UserDTO;
    title: string;
    regionId: string;
    share: boolean;
    pins: PinDTO[];
}