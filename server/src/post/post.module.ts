import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PinRepository } from './pin.repository';
import { UserModule } from 'src/user/user.module';
import { PlaceModule } from 'src/place/place.module';
import { SavedPostRepository } from './savedPost.repository';
import { RegionModule } from 'src/region/region.module';
import { LoggerModule } from 'src/logger/logger.module';
import { DefaultPostProcessor, PostProcessor } from './post.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, PinRepository, SavedPostRepository]),
    UserModule,
    forwardRef(() => PlaceModule),
    RegionModule,
    LoggerModule,
    BullModule.registerQueue({ name: 'post' })  
  ],
  providers: [PostService],
  controllers: process.env.WORKER === 'true' ? [PostController, PostProcessor, DefaultPostProcessor] : [PostController],
  exports: [PostService]
})
export class PostModule {}
