import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventPattern, Payload } from "@nestjs/microservices";
import { IncomingWebhook } from "@slack/webhook";
import { Event } from "src/event/event";
import { MyMapEvent } from "src/event/event-pub-sub";
import { Post } from "src/post/entities/post.entity";
import { PostService } from "src/post/post.service";

@Controller()
export class SlackProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly postService: PostService
    ) {
        this._webhook = new IncomingWebhook(configService.get('slack.webhook'))
    }
    private _webhook: IncomingWebhook;

    @EventPattern(MyMapEvent.POST_CREATED)
    async handlePostCreated(@Payload() job: Event) {
        const postId: number = job._id;
        const post: Post = await this.postService.readPost(postId);
        this._webhook.send({
            attachments: [
                {
                    color: 'good',
                    text: '새로운 테마가 등록됐어요~!',
                    fields: [
                        {
                            title: post.getTitle(),
                            value: post.getRegionName() + ' / 공개여부 : ' + post.getShare(),
                            short: false,
                        },
                        ],
                        ts: Math.floor(new Date().getTime() / 1000).toString(),
                }
            ],
        })
    }
    

}