import { BullModule, getQueueToken } from '@nestjs/bull';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { EventPubSub } from './event-pub-sub';
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        // BullModule.registerQueue(
        // { name: 'user' }, { name: 'post' }, { name: 'place' } ),
        ClientsModule.register([
            {
                name: 'MYMAP_SERVICE',
                transport: Transport.REDIS,
                options: {
                    url: 'redis://' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT
                }
            }
        ])
    ],
    providers: [EventPubSub]
})
export class EventModule {}
