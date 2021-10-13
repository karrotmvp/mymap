import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async generateToken(user: CreateUserDTO): Promise<string> {
        try {
            const payload = { userName: user.getUserName(), sub: user.getUserId() }
            const token = this.jwtService.sign(payload);
            return token;
        } catch (e) {
            throw e;
        }
    }
}
