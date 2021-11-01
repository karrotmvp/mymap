import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as Sentry from "@sentry/minimal"
import { MyLogger } from "src/logger/logger.service";

@Injectable()
export class DaangnAuthGuard extends AuthGuard('daangn') {
    constructor(private readonly logger: MyLogger) {
        super();
    }
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (err || !user) {
            Sentry.captureException(err || new UnauthorizedException()); 
            // this.logger.info(err || new UnauthorizedException())
            throw err || new UnauthorizedException();
        }
        return user;
    }
}