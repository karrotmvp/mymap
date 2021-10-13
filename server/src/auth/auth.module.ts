import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { DaangnStrategy } from './daangn.strategy';
import { JWTStrategy } from './jwt.strategy';

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
  forwardRef(() => UserModule)],
  providers: [AuthService, JWTStrategy, DaangnStrategy],
  exports: [AuthService]
})
export class AuthModule {}
