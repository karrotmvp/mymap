import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { init, Mixpanel } from "mixpanel";

@Injectable()
export class MixpanelProvider {
    constructor(private readonly configService: ConfigService) {
        this.mixpanel = init(configService.get('mixpanel.token'));
    }

    mixpanel: Mixpanel
}