import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CoordinatesDTO } from 'src/place/dto/coordinates.dto';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
    constructor(private readonly regionRepository: RegionRepository) {}
    
    async readNeighborRegion(regionId: string): Promise<string[]> {
        const regionIds$ = await this.regionRepository.findNeighborRegion(regionId);
        const regionIds = await lastValueFrom(regionIds$);
        return regionIds;
    }

    async readRegionName(regionId: string): Promise<string> {
        const regionName$ = await this.regionRepository.findRegionName(regionId);
        const regionName = await lastValueFrom(regionName$);
        return regionName;
    }

    async readRegionId(coordinate: CoordinatesDTO): Promise<string> {
        const regionId$ = await this.regionRepository.findRegionId(coordinate);
        const regionId = await lastValueFrom(regionId$);
        return regionId;
    }

    async validateRegionId(regionId: string): Promise<string> {
        const realRegion$ = await this.regionRepository.findRealRegionId(regionId);
        const realRegion = await lastValueFrom(realRegion$);
        return realRegion;
    }

}
