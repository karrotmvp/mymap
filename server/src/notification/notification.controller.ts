import { BadRequestException, Body, Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/apiKey.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateVerificationNotificationDTO } from './dto/create-verification-notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('api/notification')
@Controller('api/notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Roles(Role.Signed_User)
    @UseGuards(RolesGuard)
    @Post('/')
    async createNotification(@Req() req: any, @Query('type') type: string, @Body() data: any) {
        if (!type) throw new BadRequestException();
        await this.notificationService.createNotification(req.user.userId, type, data);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post('/preopen')
    async createPreopenNotification() {
        await this.notificationService.createPreopenNotification();
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post('/all/:type')
    async createNotificationToAll(@Param('type') type: string) {
        await this.notificationService.createNotificationToAll(type);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post('/admin/:type')
    async createNotificationToUsers(@Param('type') type: string, @Query('userId') userIds: number[], @Body() data: any) {
        await this.notificationService.createNotifications(userIds, type, data);
    }

    @Roles(Role.Signed_User)
    @UseGuards(RolesGuard)
    @Post('/verification')
    @ApiCreatedResponse({ description: '알림 생성 완료' })
    @ApiBody({ description: '알림 생성 형식', type: CreateVerificationNotificationDTO })
    async createVerificationNotification(@Req() req: any, @Body() createVerificationNotificationDTO: CreateVerificationNotificationDTO) {
        await this.notificationService.createVerificationNotification(req.user.userId, createVerificationNotificationDTO);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('/admin/verification/:type')
    async sendNotification(@Param('type') type: string, @Query('userId') userId: number, @Body() data: any) {
        await this.notificationService.createNotification(userId, type, data);
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    // @Post('/verification/one/:oneId')
    // async sendVerificationOneMessage(@Param('oneId') oneIds: number[]) {
    //     await this.notificationService.sendOneNotification(oneIds);
    // }
}
