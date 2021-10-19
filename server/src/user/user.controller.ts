import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { DaangnAuthGuard } from 'src/auth/daangn.guard';
import { MyLogger } from 'src/logger/logger.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: MyLogger,
    ) {}

    @UseGuards(DaangnAuthGuard)
    @Get('login')
    async login(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        const user$ = req.user;
        const user: CreateUserDTO = await lastValueFrom(user$);
        const token = await this.authService.generateToken(user);
        const userInfo: UserDTO = new UserDTO(user.getUserId(), user.getUserName(), user.getProfileImageUrl(), token);
        this.logger.debug(user);
        this.logger.debug(token);
        return userInfo;
        // res.status(302).redirect('/submit');
    }
}
