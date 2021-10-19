import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from './logger.service';
import { MixpanelProvider } from './mixpanel.provider';

@Module({
  imports: [ConfigModule],
  providers: [MyLogger, MixpanelProvider],
  exports: [MyLogger, MixpanelProvider],
})
export class LoggerModule {}
