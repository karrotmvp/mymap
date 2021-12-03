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

    private async replaceStr(message, data) {
        for (let key in message) {
            if (typeof(message[key]) !== "object") {
                for(let variable_key in data) {
                    message[key] = message[key].replace(variable_key, data[variable_key])
                }
            } else {
                this.replaceStr(message[key], data);
            }
        }
    }

    @Process('notification_created')
    async sendNotification(job: Job<Notification>) {
        const userId: string = job.data.userId;
        const type: string = job.data.type;
        const data: any = job.data.data;
        let jsonFile: string;
        try {
            jsonFile = readFileSync(join(process.cwd(), 'messages/' + type + '.json'), 'utf-8');
        } catch (e) {
            throw new BadRequestException();
        }
        const message = JSON.parse(jsonFile);
        await this.replaceStr(message, data);
        const uri = this.configService.get('daangn.oapiuri') + 'chat/send_biz_chat_message';
        const result = this.httpService.post(uri, {
            input: {
                userId: userId,
                title: message.title,
                text: message.text,
                actions: message.actions,
                imageUrl: message.imageUrl
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