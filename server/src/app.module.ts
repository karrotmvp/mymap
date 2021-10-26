import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';
import { RegionModule } from './region/region.module';
import { LoggerModule } from './logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { EventModule } from './event/event.module';
import { ToolsModule } from './tools/tools.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor } from './sentry.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
    load: [configuration]
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      entities: [join(__dirname, '/**/*.entity.js')],
      synchronize: true,
      // logging: true,
    })
  }),
  UserModule,
  PostModule,
  AuthModule,
  PlaceModule,
  RegionModule,
  LoggerModule,
  EventEmitterModule.forRoot({
    delimiter: '.',
  }),
  BullModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      redis: {
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
      },
    })
  }),
  EventModule,
  ToolsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: SentryInterceptor,
  }],
})
export class AppModule {}
