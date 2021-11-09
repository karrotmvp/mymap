import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventPattern, Payload } from "@nestjs/microservices";
import { init, Mixpanel } from "mixpanel";
import { Event } from "src/event/event";
import { MyMapEvent } from "src/event/event-pub-sub";
import { Post } from "src/post/entities/post.entity";
import { PostService } from "src/post/post.service";
import { RegionService } from "src/region/region.service";
import { UserDTO } from "src/user/dto/user.dto";
import { UserService } from "src/user/user.service";

// @Processor('user')
@Controller()
export class MixpanelProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly postService: PostService,
        private readonly regionService: RegionService
    ) {
        this._mixpanel = init(configService.get('mixpanel.token'));
    }
    private _mixpanel: Mixpanel

    //user
    // @Process('user_created')
    @EventPattern(MyMapEvent.USER_CREATED) 
    async handleUserCreated(@Payload('value') job: Event) {
        const userId: number = job._id;
        const regionName = job.data;
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

    //post
    // @Process('post_created')
    @EventPattern(MyMapEvent.POST_CREATED)
    async handlePostCreated(@Payload('value') job: Event) {
        const postId: number = job._id;
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
    @EventPattern(MyMapEvent.POST_SAVED)
    async handlePostSaved(@Payload('value') job: Event) {
        const postId: number = job._id;
        const userId: number = job.data;
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
    @EventPattern(MyMapEvent.POST_READED)
    async handlePostReaded(@Payload('value') job: Event) {
        const postId: number = job._id;
        const userId: number = job.data;
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
    @EventPattern(MyMapEvent.POST_LISTED)
    async handlePostListed(@Payload('value') job: Event) {
        const regionId: string = job.data;
        const regionName: string = await this.regionService.readRegionName(regionId);
        this._mixpanel.track('listPost', {
            regionId: regionId,
            regionName: regionName
        })
    }
    @EventPattern(MyMapEvent.POST_UNSAVED)
    async handlePostUnsaved(@Payload('value') job: Event) {
        const userId: number = job._id;
        const postId: number = job.data;
        const post: Post = await this.postService.readPost(postId);
        this._mixpanel.track('unsavePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @EventPattern(MyMapEvent.POST_DELETED)
    async handlePostDeleted(@Payload('value') job: Event) {
        const postId: number = job._id;
        const userId: number = job.data;
        const post: Post = await this.postService.readDeletedPost(postId);
        this._mixpanel.track('deletePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @EventPattern(MyMapEvent.POST_UPDATED)
    async handlePostUpdated(@Payload('value') job: Event) {
        const postId: number = job._id;
        const userId: number = job.data;
        const post: Post = await this.postService.readPost(postId);
        this._mixpanel.track('updatePost', {
            regionId: post.getRegionId(),
            regionName: post.getRegionName(),
            postId: postId,
            userId: userId
        })
    }
    @EventPattern(MyMapEvent.POST_SAVELISTED)
    async handlePostSaveListed(@Payload('value') job: Event) {
        const userId: number = job._id;
        this._mixpanel.track('savelistPost', {
            userId: userId
        })
    }
    @EventPattern(MyMapEvent.POST_MYLISTED)
    async handlePostMyListed(@Payload('value') job: Event) {
        const userId: number = job._id;
        this._mixpanel.track('mylistPost', {
            userId: userId
        })
    }

    //place
    @EventPattern(MyMapEvent.PLACE_LISTED)
    async handlePlaceListed(@Payload('value') job: Event) {
        const regionId: string = job.data;
        const regionName: string = await this.regionService.readRegionName(regionId);
        this._mixpanel.track('listPlace', {
            regionId: regionId,
            regionName: regionName,
        })
    }
}