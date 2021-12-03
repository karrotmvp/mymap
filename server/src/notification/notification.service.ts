import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PreopenUser } from 'src/user/entities/preopen-user.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { VerificationService } from 'src/verification/verification.service';
import { In } from 'typeorm';
import { CreateVerificationNotificationDTO } from './dto/create-verification-notification.dto';
import { Notification } from './dto/notification.dto';
import { VerificationNotificationEvent } from './dto/verification-notification.event';
import { VerificationNotification } from './entities/verification-notification.entity';
import { VerificationNotificationRepository } from './verification-notification.repository';

@Injectable()
export class NotificationService {
    constructor(
        private readonly userService: UserService,
        private readonly verificationNotificationRepository: VerificationNotificationRepository,
        @InjectQueue('notification') private notificationQueue: Queue
    ) {}

    async createNotification(userId: number, type: string, data: any) {
        const user: User = await this.userService.readUser(userId);
        this.notificationQueue.add('notification_created', new Notification(user.getUniqueId(), type, data));
    }

    async createPreopenNotification() {
        const preopenUsers: User[] = await this.userService.readPreopenUsers();
        preopenUsers.map(async(preopenUser) => {
            await this.notificationQueue.add('notification_created', new Notification(preopenUser.getUniqueId(), 'preopen', null), {
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

    async createNotificationToAll(type: string) {
        const users: User[] = await this.userService.readAllUser();
        const uniqueIds: string[] = users.map(user => user.getUniqueId());
        const userInfos = await this.userService.readUsersDetails(uniqueIds);
        userInfos.map(async(userInfo) => {
            await this.notificationQueue.add('notification_created', new Notification(userInfo.id, type, { "$(username)": userInfo.nickname }), {
                attempts: 5,
                backoff: 5000
            })
        })
    }

    //뭘 어떻게 보내고 싶은지 확인하기
    async sendOneNotification(oneIds: number[]) {
        const notifications: VerificationNotification[] = await this.verificationNotificationRepository.find({
            relations: ['user'],
            where: { id: In(oneIds), type: "one" }
        })
        notifications.map(async(notification) => {
            await this.notificationQueue.add('verification_notification_created', new VerificationNotificationEvent(notification.user.getUniqueId(), "one", notification.id), {
                attempts: 5,
                backoff: 5000
            })
        })
    }
}
