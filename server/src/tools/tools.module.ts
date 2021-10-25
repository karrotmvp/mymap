import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { MixpanelProcessor } from './mixpanel.processor';

@Module({
    imports: [ConfigModule, UserModule, PostModule],
    providers: process.env.WORKER === 'true' ? [MixpanelProcessor] : []
})
export class ToolsModule {
}
