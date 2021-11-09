import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node'
import { SentryInterceptor } from './sentry.interceptor';
import { MyLogger } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';
import * as Tracing from '@sentry/tracing'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  if (process.env.WORKER === 'true') {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379'
      }
    })
    await app.listen();
  } else {
    const app = await NestFactory.create(AppModule);
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({})
      ],
      tracesSampleRate: 1.0,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
    app.use(Sentry.Handlers.errorHandler());
    app.useGlobalInterceptors(new SentryInterceptor(new MyLogger(new ConfigService)));
    app.use(cookieParser());
    if (process.env.DEV === 'true') {
        app.enableCors({
          origin: true,
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
          credentials: true,
      });
      const config = new DocumentBuilder()
      .setTitle('당장모아 OPENAPI')
      .setDescription('당근마켓 MVP인턴십 당장모아 팀의 OPENAPI')
      .setVersion('1.0')
      .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/swagger', app, document)
    } else {
      app.enableCors({
        origin: "https://admin.daangn-mymap.com",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      })
    }
    app.useGlobalPipes(new ValidationPipe());
    
    await app.startAllMicroservices();
    await app.listen(3000);
  }
}
bootstrap();
