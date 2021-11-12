import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { Event } from "src/event/event";
import { MyMapEvent } from "src/event/event-pub-sub";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PostService } from "./post.service";

@Controller()
export class PostProcessor {
    constructor(
        private readonly postService: PostService,
    ) {}

    @EventPattern(MyMapEvent.USER_CREATED)
    async handleUserCreated(@Payload() job: Event) {
        const userId: number = job._id;
        // const regionId: string = job.data;
        const newPost = new CreatePostDTO();
        newPost.title = "기본 테마";
        newPost.share = false;
        // newPost.regionId = regionId;
        await this.postService.createPost(userId, newPost);
    }
}