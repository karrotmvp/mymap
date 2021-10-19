import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dailyfile } from 'tracer';

@Injectable()
export class MyLogger implements LoggerService {
    constructor(private readonly configService: ConfigService) {}

    logger_info = dailyfile({
        root: './log',
        allLogsFileName: 'info.mymap',
        stackIndex: 1,
    });

    logger_log = dailyfile({
        root: './log',
        allLogsFileName: 'log.mymap',
        stackIndex: 1,
        level: 'trace',
    });

    logger_error = dailyfile({
        root: './log',
        allLogsFileName: 'error.mymap',
        stackIndex: 1,
    })

    logger_debug = dailyfile({
        root: './log',
        allLogsFileName: 'debug.mymap',
        stackIndex: 1,
        level: this.configService.get('log.debug') === '*' ? 'debug' : 'error',
    })

    log(...trace: any[]) {
        this.logger_log.trace(trace);
    }

    error(...trace: any[]) {
        this.logger_error.error(trace);
    }

    warn(...trace: any[]) {
        this.logger_log.warn(trace);
    }

    debug(...trace: any[]) {
        this.logger_debug.debug(trace);
    }

    info(...trace: any[]) {
        this.logger_info.info(trace);
    }
}
