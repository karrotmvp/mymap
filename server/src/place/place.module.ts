import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { PostModule } from 'src/post/post.module';
import { RegionModule } from 'src/region/region.module';
import { UserModule } from 'src/user/user.module';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceService } from './place.service';
import { RecommendPlaceRepository } from './recommendPlace.repository';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
  }), ConfigModule, LoggerModule, forwardRef(() => PostModule),
  TypeOrmModule.forFeature([RecommendPlaceRepository]),
  UserModule,
  RegionModule
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository],
  exports: [PlaceService]
})
export class PlaceModule {}
