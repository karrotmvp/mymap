import { BadRequestException, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiKeyAuthGuard } from 'src/auth/apiKey.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { NotificationService } from './notification.service';

@Controller('api/notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Roles(Role.Signed_User)
    @UseGuards(RolesGuard)
    @Post('/')
    async createNotification(@Req() req: any, @Query('type') type: string) {
        if (!type) throw new BadRequestException();
        await this.notificationService.createNotification(req.user.userId, type);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post('preopen')
    async createPreopenNotification() {
        await this.notificationService.createPreopenNotification();
    }
}
