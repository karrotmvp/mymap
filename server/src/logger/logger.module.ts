import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from './logger.service';

@Module({
  imports: [ConfigModule],
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
