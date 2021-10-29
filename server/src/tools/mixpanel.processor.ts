import { Process, Processor } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";
import { Job } from "bull";
import { init, Mixpanel } from "mixpanel";
import { Event } from "src/event/event";
import { Post } from "src/post/entities/post.entity";
import { PostService } from "src/post/post.service";
import { RegionService } from "src/region/region.service";
import { UserDTO } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";

@Processor('user')
export class MixpanelUserProcessor {
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
        const regionName = job.data.data;
        const user: UserDTO = await this.userService.readUserDetail(userId);
        const postNum: number = await this.postService.readPostNum(userId);
        this._mixpanel.people.set(user.getUserId().toString(), {
            $userName: user.getUserName(),
            postNum: postNum,
            last_login_region: regionName,
            last_login_time: (new Date().toISOString()),
        })
        this._mixpanel.people.set_once(user.getUserId().toString(), '$created', (new Date().toISOString()));
        this._mixpanel.track('login', {
            userName: user.getUserName(),
            userId: user.getUserId(),
            regionName: regionName
        })
    }

}

@Processor('post')
export class MixpanelPostProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly postService: PostService,
        private readonly regionService: RegionService
    ) {
        this._mixpanel = init(configService.get('mixpanel.token'));
    }
    private _mixpanel: Mixpanel

    @Process('post_created')
    async handlePostCreated(job: Job<Event>) {
        const postId: number = job.data._id;
        const post: Post = await this.postService.readPost(postId);
        const userId: string = post.getUser().getUserId().toString();
        this._mixpanel.people.set_once(userId, 'first_post_created', (new Date().toISOString()));
        this._mixpanel.people.increment(userId, 'postNum');
        this._mixpanel.track('createPost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            pinNum: post.pins.length,
            share: post.getShare()
        })
    }
    @Process('post_saved')
    async handlePostSaved(job: Job<Event>) {
        const postId: number = job.data._id;
        const userId: number = job.data.data;
        const post: Post = await this.postService.readPost(postId);
        this._mixpanel.people.increment(userId.toString(), 'savedNum');
        this._mixpanel.people.increment(post.getUser().getUserId().toString(), 'getSavedNum');
        this._mixpanel.track('savePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @Process('post_readed')
    async handlePostReaded(job: Job<Event>) {
        const postId: number = job.data._id;
        const userId: number = job.data.data;
        const post: Post = await this.postService.readPost(postId);
        this._mixpanel.people.increment(userId.toString(), 'readedNum');
        this._mixpanel.people.increment(post.getUser().getUserId().toString(), 'getReadedNum');
        this._mixpanel.track('readPost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId,
        })
    }
    @Process('post_listed')
    async handlePostListed(job: Job<Event>) {
        const regionId: string = job.data.data;
        const regionName: string = await this.regionService.readRegionName(regionId);
        this._mixpanel.track('listPost', {
            regionId: regionId,
            regionName: regionName
        })
    }
    @Process('post_unsaved')
    async handlePostUnsaved(job: Job<Event>) {
        const userId: number = job.data._id;
        const postId: number = job.data.data;
        const post: Post = await this.postService.readPost(postId);
        this._mixpanel.track('unsavePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @Process('post_deleted')
    async handlePostDeleted(job: Job<Event>) {
        const postId: number = job.data._id;
        const userId: number = job.data.data;
        const post: Post = await this.postService.readDeletedPost(postId);
        this._mixpanel.track('deletePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @Process('post_updated')
    async handlePostUpdated(job: Job<Event>) {
        const postId: number = job.data._id;
        const userId: number = job.data.data;
        const post: Post = await this.postService.readPost(postId);
        this._mixpanel.track('updatePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @Process('post_savelisted')
    async handlePostSaveListed(job: Job<Event>) {
        const userId: number = job.data._id;
        this._mixpanel.track('savelistPost', {
            userId: userId
        })
    }
    @Process('post_mylisted')
    async handlePostMyListed(job: Job<Event>) {
        const userId: number = job.data._id;
        this._mixpanel.track('mylistPost', {
            userId: userId
        })
    }
}

@Processor('place')
export class MixpanelPlaceProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly regionService: RegionService
    ) {
        this._mixpanel = init(configService.get('mixpanel.token'));
    }
    private _mixpanel: Mixpanel

    @Process('place_listed')
    async handlePlaceListed(job: Job<Event>) {
        const regionId: string = job.data.data;
        const regionName: string = await this.regionService.readRegionName(regionId);
        this._mixpanel.track('listPlace', {
            regionId: regionId,
            regionName: regionName,
        })
    }
}