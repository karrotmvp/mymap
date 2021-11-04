import { ApiProperty } from "@nestjs/swagger";
import { CoordinatesDTO } from "src/place/dto/coordinates.dto";
import { PostDTO } from "./post.dto";

export class FeedDTO {
    constructor(posts: PostDTO[], coordinates: CoordinatesDTO) {
        this.posts = posts;
        this.coordinates = coordinates;
    }

    @ApiProperty({ type: [PostDTO] })
    posts: PostDTO[];

    @ApiProperty()
    coordinates: CoordinatesDTO;
}