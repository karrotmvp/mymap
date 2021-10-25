import { Process, Processor } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";
import { Job } from "bull";
import { init, Mixpanel } from "mixpanel";
import { Event } from "src/event/event";
import { Post } from "src/post/entities/post.entity";
import { PostService } from "src/post/post.service";
import { UserDTO } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";

@Processor('mixpanel')
export class MixpanelProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly postService: PostService,
    ) {
        this._mixpanel = init(configService.get('mixpanel.token'));
    }
    private _mixpanel: Mixpanel

    @Process('user_created')
    async handleUserCreated(job: Job<Event>) {        
        const userId: number = job.data._id;
        const user: UserDTO = await this.userService.readUserDetail(userId);
        const postNum: number = await this.postService.readPostNum(userId);
        this._mixpanel.people.set(user.getUserId().toString(), {
            $userName: user.getUserName(),
            postNum: postNum
        })
        this._mixpanel.people.set_once(user.getUserId().toString(), '$created', (new Date().toISOString()));
    }

    @Process('post_created')
    async handlePostCreated(job: Job<Event>) {
        const postId: number = job.data.getId();
        const post: Post = await this.postService.readPost(postId);
        const userId: string = post.getUser().getUserId().toString();
        this._mixpanel.people.set_once(userId, 'first_post_created', (new Date().toISOString()));
        this._mixpanel.people.increment(userId, 'postNum');
        this._mixpanel.track('createPost', {
            regionId: post.getRegionId(),
            pinNum: post.pins.length,
            share: post.getShare()
        })
    }

}