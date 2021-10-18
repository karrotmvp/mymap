import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RegionRepository } from './region.repository';
import { RegionService } from './region.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
  }), ConfigModule],
  providers: [RegionService, RegionRepository],
  exports: [RegionService]
})
export class RegionModule {}
