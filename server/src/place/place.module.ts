import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceService } from './place.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
  }), ConfigModule],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository],
  exports: [PlaceService]
})
export class PlaceModule {}
