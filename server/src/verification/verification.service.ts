import { Injectable } from '@nestjs/common';
import { RegionService } from 'src/region/region.service';
import { CreateOneDTO } from './dto/create-one.dto';
import { CreateTwoDTO } from './dto/create-two.dto';
import { One } from './entities/one.entity';
import { Two } from './entities/two.entity';
import { OneRepository } from './one.repository';
import { TwoRepository } from './two.repository';

@Injectable()
export class VerificationService {
    constructor(
        private readonly regionService: RegionService,
        private readonly oneRepository: OneRepository,
        private readonly twoRepository: TwoRepository
    ) {}

    async createOneAnswer(createOneDTO: CreateOneDTO) {
        const regionName = await this.regionService.readRegionName(createOneDTO.regionId);
        const newEntity = new One();
        newEntity.regionId = createOneDTO.regionId;
        newEntity.regionName = regionName;
        newEntity.themeName = createOneDTO.themeName;
        return await this.oneRepository.save(newEntity);
    }

    async createTwoAnswer(createTwoDTO: CreateTwoDTO) {
        const regionName = await this.regionService.readRegionName(createTwoDTO.regionId);
        const newEntity = new Two();
        newEntity.regionId = createTwoDTO.regionId;
        newEntity.regionName = regionName;
        newEntity.placeNames = createTwoDTO.placeNames;
        return await this.twoRepository.save(newEntity);
    }
}
