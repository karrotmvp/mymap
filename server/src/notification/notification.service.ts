import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PreopenUser } from 'src/user/entities/preopen-user.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Notification } from './dto/notification.dto';

@Injectable()
export class NotificationService {
    constructor(
        private readonly userService: UserService,
        @InjectQueue('notification') private notificationQueue: Queue
    ) {}

    async createNotification(userId: number, type: string) {
        const user: User = await this.userService.readUser(userId);
        await this.notificationQueue.add('notification_created', new Notification(user.getUniqueId(), type));
    }

    async createPreopenNotification() {
        const preopenUsers: PreopenUser[] = await this.userService.readPreopenUsers();
        preopenUsers.map(async(preopenUser) => {
            await this.notificationQueue.add('notification_created', new Notification(preopenUser.getUser().getUniqueId(), 'preopen'))
            await this.userService.setPreopenUserSended(preopenUser.getPreopenUserId());
        })
    }
}
