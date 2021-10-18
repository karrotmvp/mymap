import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
    constructor(private readonly regionRepository: RegionRepository) {}
    
    async readNeighborRegion(regionId: string): Promise<string[]> {
        const regionIds$ = await this.regionRepository.findNeighborRegion(regionId)
        const regionIds = await lastValueFrom(regionIds$);
        return regionIds;
    }
}
