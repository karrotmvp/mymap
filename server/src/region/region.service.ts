import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
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

}
