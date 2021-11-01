import { BullModule, getQueueToken } from '@nestjs/bull';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { EventPubSub } from './event-pub-sub';
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
    imports: [BullModule.registerQueue(
        { name: 'user' }, { name: 'post' }, { name: 'place' } )],
    providers: [EventPubSub]
})
export class EventModule{
    // @Inject(getQueueToken('noti'))
    // private readonly queue: Queue

    // configure(consumer: MiddlewareConsumer) {
    //     const serverAdapter = new ExpressAdapter()
    //     const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
    //         {   queues: [new BullAdapter(this.queue)], serverAdapter },
    //     )
    //     serverAdapter.setBasePath('/api/admin/queues')
    //     consumer.apply(serverAdapter.getRouter()).forRoutes('/api/admin/queues');
    // }
}
