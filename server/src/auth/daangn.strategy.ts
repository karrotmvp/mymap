import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-daangn"
import { catchError, map } from "rxjs";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import * as Sentry from "@sentry/minimal"

@Injectable()
export class DaangnStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            env: configService.get('service_env'),
            scope: configService.get('daangn.scope'),
            app_id: configService.get('daangn.app_id'),
            app_secret: configService.get('daangn.app_secret')
        });
    }

    async validate(token: string) {
        const uri = this.configService.get('daangn.openapiuri') + '/api/v1/users/me';
        return this.httpService.get(uri, { headers : { Authorization: 'Bearer ' + token }}).pipe(
            map(async(res) => {
                const response = res.data?.data
                if (!response) throw new BadRequestException();
                const user = new CreateUserDTO(response, token);
                return await this.userService.login(user);
            }),
            catchError((err) => {
                Sentry.captureException(err);
                throw new BadRequestException();
            })
        );
    }
}