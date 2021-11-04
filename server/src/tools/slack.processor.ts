// import { Process, Processor } from "@nestjs/bull";
// import { ConfigService } from "@nestjs/config";
// import { IncomingWebhook } from "@slack/webhook";
// import { Job } from "bull";
// import { Event } from "src/event/event";
// import { Post } from "src/post/entities/post.entity";
// import { PostService } from "src/post/post.service";

// class SlackProcessor {
//     constructor(
//         private readonly configService: ConfigService
//     ) {
//         this._webhook = new IncomingWebhook(configService.get('slack.webhook'))
//     }
//     protected _webhook: IncomingWebhook;
// }

// @Processor('post')
// export class SlackPostProcessor extends SlackProcessor {
//     constructor(
//         configService: ConfigService,
//         private readonly PostService: PostService,
//     ) {
//         super(configService)
//     }

//     @Process('post_created')
//     async handlePostCreated(job: Job<Event>) {
//         console.log('@@@@@@@@@@')
//         const postId: number = job.data._id;
//         const post: Post = await this.PostService.readPost(postId);
//         this._webhook.send({
//             attachments: [
//                 {
//                     color: 'good',
//                     text: '새로운 테마가 등록됐어요~!',
//                     fields: [
//                         {
//                             title: post.getTitle(),
//                             value: post.getRegionName() + ' ' + post.getShare(),
//                             short: false,
//                         },
//                         ],
//                         ts: Math.floor(new Date().getTime() / 1000).toString(),
//                 }
//             ],
//         })
//     }
    

// }