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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
