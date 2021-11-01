import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Job } from "bull";
import { readFileSync } from "fs";
import { join } from "path";
import { catchError, lastValueFrom, map } from "rxjs";
import { Notification } from "./dto/notification.dto";

@Processor('notification')
export class NotificationProcessor {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    @Process('notification_created')
    async sendNotification(job: Job<Notification>) {
        const userId: string = job.data.userId;
        const type: string = job.data.type;
        let jsonFile: string;
        try {
            jsonFile = readFileSync(join(process.cwd(), 'messages/' + type + '.json'), 'utf-8');
        } catch (e) {
            throw new BadRequestException();
        }
        const message = JSON.parse(jsonFile);
        const uri = this.configService.get('daangn.oapiuri') + 'chat/send_biz_chat_message';
        const result = this.httpService.post(uri, {
            input: {
                userId: userId,
                title: message.title,
                text: message.text,
                actions: message.actions
        }}, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            },
        }).pipe(catchError((err) => {
            throw new BadRequestException();
        }))
        lastValueFrom(result);
    }
}