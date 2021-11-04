import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';
import { lastValueFrom } from 'rxjs';
import { ApiKeyAuthGuard } from 'src/auth/apiKey.guard';
import { AuthService } from 'src/auth/auth.service';
import { DaangnAuthGuard } from 'src/auth/daangn.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { MyLogger } from 'src/logger/logger.service';
import { RegionService } from 'src/region/region.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('api/user')
@Controller('api/user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly regionService: RegionService,
        private readonly logger: MyLogger,
        private readonly eventEmitter: EventEmitter2,
        private readonly userService: UserService
    ) {}

    @UseGuards(DaangnAuthGuard)
    @Get('login')
    @ApiOkResponse({ description: '인증 완료, 토큰 발급', type: UserDTO })
    @ApiBadRequestResponse({ description: '인증 실패' })
    @ApiUnauthorizedResponse({ description: '인증 실패' })
    @ApiQuery({ name: 'code', type: String })
    async login(@Req() req: any, @Query('regionId') regionId: string): Promise<UserDTO> {
        const user$ = req.user;
        const user: CreateUserDTO = await lastValueFrom(user$);
        const token = await this.authService.generateToken(user);
        const regionName = await this.regionService.readRegionName(regionId);
        const userInfo: UserDTO = new UserDTO(user.getUserId(), user.getUserName(), user.getProfileImageUrl(), token, regionName);
        this.eventEmitter.emit(MyMapEvent.USER_CREATED, new Event(user.getUserId(), regionName));
        this.logger.debug(user);
        this.logger.debug(token);
        return userInfo;
    }

    @UseGuards(JwtAuthGuard)
    @Post('preopen')
    @ApiCreatedResponse({ description: '오픈 알림 등록 완료' })
    @ApiUnauthorizedResponse({ description: '토큰 만료, 유저 정보 오류' })
    async createPreopenUser(@Req() req: any, @Query('regionId') regionId: string) {
        const userId = req.user.userId;
        await this.userService.createPreopenUser(userId, regionId);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Get('adminLogin')
    async adminLogin(@Req() req: any) {
        const user: User = await this.userService.readAdmin();
        const info = {
            nickname: "admin",
            profile_image_url: null,
            user_id: null,
        }
        const admin = new CreateUserDTO(info, null)
        admin.setUserId(user.getUserId());
        const token = await this.authService.generateToken(admin);
        return token;
    }
}
