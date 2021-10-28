import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { DaangnAuthGuard } from 'src/auth/daangn.guard';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { MyLogger } from 'src/logger/logger.service';
import { RegionService } from 'src/region/region.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly regionService: RegionService,
        private readonly logger: MyLogger,
        private readonly eventEmitter: EventEmitter2
    ) {}

    @UseGuards(DaangnAuthGuard)
    @Get('login')
    async login(@Req() req: any, @Query('regionId') regionId: string) {
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
}
