import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from 'src/post/post.module';
import { RegionModule } from 'src/region/region.module';
import { UserModule } from 'src/user/user.module';
import { MixpanelPlaceProcessor, MixpanelPostProcessor, MixpanelUserProcessor } from './mixpanel.processor';
// import { SlackPostProcessor } from './slack.processor';

@Module({
    imports: [ConfigModule, UserModule, PostModule, RegionModule],
    providers: process.env.WORKER === 'true' ? [MixpanelUserProcessor, MixpanelPostProcessor, MixpanelPlaceProcessor] : []
})
export class ToolsModule {
}
