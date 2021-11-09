import { BullModule, getQueueToken } from '@nestjs/bull';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { EventPubSub } from './event-pub-sub';
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        // BullModule.registerQueue(
        // { name: 'user' }, { name: 'post' }, { name: 'place' } ),
        ClientsModule.registerAsync([{
            name: 'MYMAP_SERVICE',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => (
            {
                transport: Transport.REDIS,
                options: {
                    host: configService.get('redis.host'),
                    port: configService.get('redis.port')
                }
            })
        }
        ])
    ],
    providers: [EventPubSub]
})
export class EventModule {}
