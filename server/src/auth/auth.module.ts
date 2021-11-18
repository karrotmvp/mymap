import { HttpModule } from '@nestjs/axios';
import { forwardRef, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { ApiKeyStrategy } from './apiKey.strategy';
import { AuthService } from './auth.service';
import { DaangnStrategy } from './daangn.strategy';
import { JWTStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('jwt.secret'),
      signOptions: { expiresIn: '6h'}
    })
  }), HttpModule.register({
    timeout: 5000,
  }),
  ConfigModule,
  LoggerModule,
  forwardRef(() => UserModule),
  PassportModule],
  providers: [AuthService, JWTStrategy, DaangnStrategy, ApiKeyStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
