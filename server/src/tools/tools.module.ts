import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from 'src/post/post.module';
import { RegionModule } from 'src/region/region.module';
import { UserModule } from 'src/user/user.module';
import { MixpanelProcessor } from './mixpanel.processor';
import { SlackProcessor } from './slack.processor';
// import { SlackPostProcessor } from './slack.processor';

@Module({
    imports: [ConfigModule, UserModule, PostModule, RegionModule],
    controllers: process.env.WORKER === 'true' ? [MixpanelProcessor, SlackProcessor] : []
})
export class ToolsModule {
}
