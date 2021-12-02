import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PreopenUser } from 'src/user/entities/preopen-user.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateVerificationNotificationDTO } from './dto/create-verification-notification.dto';
import { Notification } from './dto/notification.dto';
import { VerificationNotification } from './entities/verification-notification.entity';
import { VerificationNotificationRepository } from './verification-notification.repository';

@Injectable()
export class NotificationService {
    constructor(
        private readonly userService: UserService,
        private readonly verificationNotificationRepository: VerificationNotificationRepository,
        @InjectQueue('notification') private notificationQueue: Queue
    ) {}

    async createNotification(userId: number, type: string) {
        const user: User = await this.userService.readUser(userId);
        this.notificationQueue.add('notification_created', new Notification(user.getUniqueId(), type));
    }

    async createPreopenNotification() {
        const preopenUsers: User[] = await this.userService.readPreopenUsers();
        preopenUsers.map(async(preopenUser) => {
            await this.notificationQueue.add('notification_created', new Notification(preopenUser.getUniqueId(), 'preopen'), {
                attempts: 5,
                backoff: 5000
            })
        })
    }

    async createVerificationNotification(userId: number, createVerificationNotificationDTO: CreateVerificationNotificationDTO) {
        const user: User = await this.userService.readUser(userId);
        const newEntity: VerificationNotification = new VerificationNotification();
        newEntity.user = user;
        newEntity.type = createVerificationNotificationDTO.type;
        newEntity.id = createVerificationNotificationDTO.id;
        await this.verificationNotificationRepository.save(newEntity);
    }

}
