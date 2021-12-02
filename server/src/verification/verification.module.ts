import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionModule } from 'src/region/region.module';
import { OneRepository } from './one.repository';
import { TwoRepository } from './two.repository';
import { VerificationService } from './verification.service';
import { VerificationController } from './verificaton.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OneRepository, TwoRepository]), RegionModule],
  providers: [VerificationService],
  controllers: [VerificationController]
})
export class VerificationModule {}
