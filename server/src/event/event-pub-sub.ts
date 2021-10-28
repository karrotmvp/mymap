import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { Event } from './event';

export const MyMapEvent = {
    USER_CREATED: 'user.created',
    POST_CREATED: 'post.created',
    POST_SAVED: 'post.saved',
    POST_READED: 'post.readed',
    POST_LISTED: 'post.listed',
    POST_UNSAVED: 'post.unsaved',
    POST_DELETED: 'post.deleted',
    POST_UPDATED: 'post.updated',
    POST_SAVELISTED: 'post.savedlisted',
    POST_MYLISTED: 'post.mylisted',
    PLACE_LISTED: 'place.listed'
} as const

@Injectable()
export class EventPubSub {
    constructor(
        @InjectQueue('mixpanel') private mixpanelQueue: Queue
    ) {}

    //user
    @OnEvent(MyMapEvent.USER_CREATED)
    async handleUserCreatedEvent(event: Event) {
        await this.mixpanelQueue.add('user_created', event);
    }

    //post
    @OnEvent(MyMapEvent.POST_CREATED)
    async handlePostCreatedEvent(event: Event) {
        await this.mixpanelQueue.add('post_created', event);
    }
    @OnEvent(MyMapEvent.POST_SAVED)
    async handlePostSavedEvent(event: Event) {
        await this.mixpanelQueue.add('post_saved', event);
    }
    @OnEvent(MyMapEvent.POST_READED)
    async handlePostReadedEvent(event: Event) {
        await this.mixpanelQueue.add('post_readed', event);
    }
    @OnEvent(MyMapEvent.POST_LISTED)
    async handlePostListedEvent(event: Event) {
        await this.mixpanelQueue.add('post_listed', event);
    }
    @OnEvent(MyMapEvent.POST_UNSAVED)
    async handlePostUnsavedEvent(event: Event) {
        await this.mixpanelQueue.add('post_unsaved', event);
    }
    @OnEvent(MyMapEvent.POST_DELETED)
    async handlePostDeletedEvent(event: Event) {
        await this.mixpanelQueue.add('post_deleted', event);
    }
    @OnEvent(MyMapEvent.POST_UPDATED)
    async handlePostUpdatedEvent(event: Event) {
        await this.mixpanelQueue.add('post_updated', event);
    }
    @OnEvent(MyMapEvent.POST_SAVELISTED)
    async handlePostSaveListedEvent(event: Event) {
        await this.mixpanelQueue.add('post_savelisted', event);
    }
    @OnEvent(MyMapEvent.POST_MYLISTED)
    async handlePostMyListed(event: Event) {
        await this.mixpanelQueue.add('post_mylisted', event);
    }
    //place
    @OnEvent(MyMapEvent.PLACE_LISTED)
    async handlePlaceListed(event: Event) {
        await this.mixpanelQueue.add('place_listed', event);
    }
}
