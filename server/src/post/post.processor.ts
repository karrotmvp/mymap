import { Process, Processor } from "@nestjs/bull";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { User } from "@sentry/types";
import { Job } from "bull";
import { Event } from "src/event/event";
import { MyMapEvent } from "src/event/event-pub-sub";
import { UserService } from "src/user/user.service";
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

@Processor('post')
export class DefaultPostProcessor {
    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService
    ) {}

    @Process('defaultPost_created')
    async createDefaultPost(job: Job<Event>) {
        const userId: number = job.data._id;
        const user: User = await this.userService.readUser(userId);
        
    }

}