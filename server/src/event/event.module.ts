import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventPubSub } from './event-pub-sub';

@Module({
    imports: [BullModule.registerQueue(
        { name: 'mixpanel'}, )],
    providers: [EventPubSub]
})
export class EventModule {
}
