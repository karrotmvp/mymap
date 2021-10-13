import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                  return req?.cookies?.w_auth;
                },
              ]),
              ignoreExpiration: false,
              secretOrKey: configService.get('jwt.secret'),
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, userName: payload.userName }
    }
}