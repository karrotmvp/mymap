import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { AuthService } from "./auth.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private authService: AuthService) {
        super({
            header: 'X-Api-Key',
            prefix: '',
        }, false)
    }

    async validate(apikey) {
        const checkKey = this.authService.validateApiKey(apikey);
        if (!checkKey) {
            throw new UnauthorizedException();
        }
        return true;
    }
}