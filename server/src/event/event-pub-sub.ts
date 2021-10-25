import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { Event } from './event';

@Injectable()
export class EventPubSub {
    constructor(
        @InjectQueue('mixpanel') private mixpanelQueue: Queue
    ) {}

    //user
    @OnEvent('user.created')
    async handleUserCreatedEvent(event: Event) {
        await this.mixpanelQueue.add('user_created', event);
    }

    //post
    @OnEvent('post.created')
    async handlePostCreatedEvent(event: Event) {
        await this.mixpanelQueue.add('post_created', event);
    }
}
