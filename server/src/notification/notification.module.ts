import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserModule } from 'src/user/user.module';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { createBullBoard } from '@bull-board/api';
import { NotificationProcessor } from './notification.processor';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, BullModule.registerQueue({ name: 'notification' }), ConfigModule, HttpModule.register({
    timeout: 5000
  })],
  providers: process.env.WORKER === 'true' ? [NotificationService, NotificationProcessor] : [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule{
  @Inject(getQueueToken('notification'))
    private readonly queue: Queue

    configure(consumer: MiddlewareConsumer) {
        const serverAdapter = new ExpressAdapter()
        const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
            {   queues: [new BullAdapter(this.queue)], serverAdapter },
        )
        serverAdapter.setBasePath('/api/admin/queues')
        consumer.apply(serverAdapter.getRouter()).forRoutes('/api/admin/queues');
    }
}
