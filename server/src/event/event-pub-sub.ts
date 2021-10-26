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
    @OnEvent('post.saved')
    async handlePostSavedEvent(event: Event) {
        await this.mixpanelQueue.add('post_saved', event);
    }
    @OnEvent('post.readed')
    async handlePostReadedEvent(event: Event) {
        await this.mixpanelQueue.add('post_readed', event);
    }
    @OnEvent('post.listed')
    async handlePostListedEvent(event: Event) {
        await this.mixpanelQueue.add('post_listed', event);
    }
    @OnEvent('post.unsaved')
    async handlePostUnsavedEvent(event: Event) {
        await this.mixpanelQueue.add('post_unsaved', event);
    }
    @OnEvent('post.deleted')
    async handlePostDeletedEvent(event: Event) {
        await this.mixpanelQueue.add('post_deleted', event);
    }
    @OnEvent('post.updated')
    async handlePostUpdatedEvent(event: Event) {
        await this.mixpanelQueue.add('post_updated', event);
    }
    @OnEvent('post.savelisted')
    async handlePostSaveListedEvent(event: Event) {
        await this.mixpanelQueue.add('post_savelisted', event);
    }
    @OnEvent('post.mylisted')
    async handlePostMyListed(event: Event) {
        await this.mixpanelQueue.add('post_mylisted', event);
    }
    //place
    @OnEvent('place.listed')
    async handlePlaceListed(event: Event) {
        await this.mixpanelQueue.add('place_listed', event);
    }
}
