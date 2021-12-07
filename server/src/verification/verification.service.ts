import { Injectable } from '@nestjs/common';
import { RegionService } from 'src/region/region.service';
import { CreateFourDTO } from './dto/create-four.dto';
import { CreateOneDTO } from './dto/create-one.dto';
import { CreateTwoDTO } from './dto/create-two.dto';
import { Four } from './entities/four.entity';
import { One } from './entities/one.entity';
import { Two } from './entities/two.entity';
import { FourRepository } from './four.repository';
import { OneRepository } from './one.repository';
import { TwoRepository } from './two.repository';

@Injectable()
export class VerificationService {
    constructor(
        private readonly regionService: RegionService,
        private readonly oneRepository: OneRepository,
        private readonly twoRepository: TwoRepository,
        private readonly fourRepository: FourRepository
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
        const placeNames: string = createTwoDTO.placeNames.join(',');
        const newEntity = new Two();
        newEntity.regionId = createTwoDTO.regionId;
        newEntity.regionName = regionName;
        newEntity.placeNum = createTwoDTO.placeNames.length;
        newEntity.placeNames = placeNames;
        return await this.twoRepository.save(newEntity);
    }

    async createFourAnswer(createFourDTO: CreateFourDTO) {
        const regionName = await this.regionService.readRegionName(createFourDTO.regionId);
        const placeNames: string = createFourDTO.placeNames.join(',');
        const newEntity = new Four();
        newEntity.regionId = createFourDTO.regionId;
        newEntity.regionName = regionName;
        newEntity.placeNum = createFourDTO.placeNames.length;
        newEntity.placeNames = placeNames;
        return await this.fourRepository.save(newEntity);
    }
}
