import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
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
    PLACE_LISTED: 'place.listed',
    NOTI_EXECUTED: 'noti.executed',
} as const

@Injectable()
export class EventPubSub {
    constructor(
        // @InjectQueue('user') private userQueue: Queue,
        // @InjectQueue('post') private postQueue: Queue,
        // @InjectQueue('place') private PlaceQueue: Queue,
        @Inject('MYMAP_SERVICE') private readonly mymapServiceClient: ClientKafka
    ) {}
    
    //user
    @OnEvent(MyMapEvent.USER_CREATED)
    async handleUserCreatedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.USER_CREATED, JSON.stringify(event));
        // await this.userQueue.add('user_created', event);
    }

    //post
    @OnEvent(MyMapEvent.POST_CREATED)
    async handlePostCreatedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_CREATED, JSON.stringify(event));
        // await this.postQueue.add('post_created', event);
    }
    @OnEvent(MyMapEvent.POST_SAVED)
    async handlePostSavedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_SAVED, JSON.stringify(event));
        // await this.postQueue.add('post_saved', event);
    }
    @OnEvent(MyMapEvent.POST_READED)
    async handlePostReadedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_READED, JSON.stringify(event));
        // await this.postQueue.add('post_readed', event);
    }
    @OnEvent(MyMapEvent.POST_LISTED)
    async handlePostListedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_LISTED, JSON.stringify(event));
        // await this.postQueue.add('post_listed', event);
    }
    @OnEvent(MyMapEvent.POST_UNSAVED)
    async handlePostUnsavedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_UNSAVED, JSON.stringify(event));
        // await this.postQueue.add('post_unsaved', event);
    }
    @OnEvent(MyMapEvent.POST_DELETED)
    async handlePostDeletedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_DELETED, JSON.stringify(event));
        // await this.postQueue.add('post_deleted', event);
    }
    @OnEvent(MyMapEvent.POST_UPDATED)
    async handlePostUpdatedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_UPDATED, JSON.stringify(event));
        // await this.postQueue.add('post_updated', event);
    }
    @OnEvent(MyMapEvent.POST_SAVELISTED)
    async handlePostSaveListedEvent(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_SAVELISTED, JSON.stringify(event));
        // await this.postQueue.add('post_savelisted', event);
    }
    @OnEvent(MyMapEvent.POST_MYLISTED)
    async handlePostMyListed(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.POST_MYLISTED, JSON.stringify(event));
        // await this.postQueue.add('post_mylisted', event);
    }
    //place
    @OnEvent(MyMapEvent.PLACE_LISTED)
    async handlePlaceListed(event: Event) {
        this.mymapServiceClient.emit(MyMapEvent.PLACE_LISTED, JSON.stringify(event));
        // await this.PlaceQueue.add('place_listed', event);
    }
}
