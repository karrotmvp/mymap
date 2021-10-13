import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PlaceDTO } from './dto/place.dto';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
    constructor(
        private readonly placeRepository: PlaceRepository
    ) {}

    async readPlace(placeId: string): Promise<PlaceDTO> {
        const place$ = await this.placeRepository.findOne(placeId);
        const place = await lastValueFrom(place$);
        return place;
    }

    async readPlaces(placeIds: string[]): Promise<PlaceDTO[]> {
        const places$ = await this.placeRepository.findWithIds(placeIds);
        const places = await lastValueFrom(places$);
        return places;
    }

    async searchPlace(query: string, regionId: number, page: number, perPage: number): Promise<PlaceDTO[]> {
        const places$ = await this.placeRepository.findWithName(query, regionId, page, perPage);
        const places = await lastValueFrom(places$);
        return places;
    }
}
