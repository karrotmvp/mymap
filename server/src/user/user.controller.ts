import { Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { DaangnAuthGuard } from 'src/auth/daangn.guard';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(DaangnAuthGuard)
    @Post('login')
    async login(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        const user$ = req.user;
        const user: CreateUserDTO = await lastValueFrom(user$);
        const token = await this.authService.generateToken(user);
        res.cookie('w_auth', token);
        // res.status(302).redirect('/submit');
    }
}
