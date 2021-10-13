import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-daangn"
import { map } from "rxjs";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class DaangnStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            env: configService.get('env'),
            scope: configService.get('daangn.scope'),
            app_id: configService.get('daangn.app_id'),
            app_secret: configService.get('daangn.app_secret')
        });
    }

    async validate(token: string) {
        try {
            const uri = this.configService.get('daangn.openapiuri') + '/api/v1/users/me';
            return this.httpService.get(uri, { headers : { Authorization: 'Bearer ' + token }}).pipe(map(async(res) => {
                const user = new CreateUserDTO(res.data.data, token);
                return await this.userService.login(user);
            }));
        } catch (e) {
            throw e;
        }
    }
}