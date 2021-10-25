import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import * as Sentry from '@sentry/minimal'
import { MyLogger } from './logger/logger.service';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(private readonly logger: MyLogger) {}

  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException)  {
          this.logger.info(error);
        } else {
          this.logger.error(error);
        }
        Sentry.captureException(error);
        return throwError(() =>  error)
      })
    );
  }
}
