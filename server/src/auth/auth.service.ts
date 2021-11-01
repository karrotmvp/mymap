import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    private apiKeys: string[] = [
        this.configService.get('security.apikey1'),
        this.configService.get('security.apikey2')
    ]

    async generateToken(user: CreateUserDTO): Promise<string> {
        try {
            const payload = { userName: user.getUserName(), sub: user.getUserId() }
            const token = this.jwtService.sign(payload);
            return token;
        } catch (e) {
            throw e;
        }
    }

    validateApiKey(apiKey: string) {
        return this.apiKeys.find(apiK => apiKey === apiK);
    }
}
