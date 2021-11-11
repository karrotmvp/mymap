import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PlaceDTO } from './dto/place.dto';
import { PlaceRepository } from './place.repository';
import { readFileSync } from 'fs';
import { join } from 'path';
import { RegionPlaceDTO } from './dto/regionPlace.dto';
import { PostService } from 'src/post/post.service';
import { CreateRecommendPlaceDTO } from './dto/create-recommendPlace.dto';
import { RegionService } from 'src/region/region.service';
import { RecommendPlace } from './entities/recommendPlace.entity';
import { RecommendPlaceRepository } from './recommendPlace.repository';
import { Pin } from 'src/post/entities/pin.entity';

@Injectable()
export class PlaceService {
    constructor(
        private readonly placeRepository: PlaceRepository,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        private readonly regionService: RegionService,
        private readonly recommendPlaceRepository: RecommendPlaceRepository
    ) {}

    private async convertId(regionId: string): Promise<number> {
        const jsonFile = readFileSync(join(process.cwd(), 'regionId.json'), 'utf-8');
        const regionJson = JSON.parse(jsonFile);
        const regionNum = regionJson[regionId];
        if (!regionNum) throw new BadRequestException();
        return regionNum;
    }

    async readPlace(placeId: string): Promise<PlaceDTO> {
        const place$ = await this.placeRepository.findOne(placeId);
        const place = await lastValueFrom(place$);
        place.saved = await this.postService.countSavedPlaces(place.placeId);
        return place;
    }

    async readPlaces(placeIds: string[]): Promise<PlaceDTO[]> {
        const places$ = await this.placeRepository.findWithIds(placeIds);
        const places = await lastValueFrom(places$);
        places.map(async(place) => {
            place.saved = await this.postService.countSavedPlaces(place.placeId);
        })
        return places;
    }

    async searchPlace(query: string, regionId: string, page: number, perPage: number): Promise<PlaceDTO[]> {
        const regionNum = await this.convertId(regionId);
        const places$ = await this.placeRepository.findWithName(query, regionNum, page, perPage);
        const places = await lastValueFrom(places$);
        return places;
    }

    async getSeed(): Promise<string> {
        const paginator$ = await this.placeRepository.getSeed();
        return await lastValueFrom(paginator$);
    }

    async readRegionPlaces(regionId: string, seed: string, perPage: number, page: number): Promise<RegionPlaceDTO> {
        const regionNum = await this.convertId(regionId);
        const places$ = await this.placeRepository.findWithRegion(regionNum, seed, perPage, page);
        const places: PlaceDTO[] = await lastValueFrom(places$);
        const promise = places.map(async(place) => {
            place.saved = await this.postService.countSavedPlaces(place.placeId);
            return place
        })
        const newPlaces:PlaceDTO[] = await Promise.all(promise);
        const regionPlace = new RegionPlaceDTO(newPlaces, seed);
        return regionPlace;
    }

    async readSavedPlaces(userId: number): Promise<PlaceDTO[]> {
        const pins: Pin[] = await this.postService.readPins(userId);
        const places: string[] = pins.map(pin => pin.getPlaceId());
        const placeIds: string[] = [...new Set(places)];
        return await this.readPlaces(placeIds);
    }

    async readRecommendPlacesRandom(regionId: string, seed: number, perPage: number, page: number): Promise<RegionPlaceDTO> {
        const regions = await this.regionService.readNeighborRegion(regionId);
        const places: string[] = await this.recommendPlaceRepository.findWithRegionId(regions, seed, perPage, page);
        const PlaceDTOs: PlaceDTO[] = await this.readPlaces(places);
        const regionPlace = new RegionPlaceDTO(PlaceDTOs, seed.toString());
        return regionPlace;
    }

    async readRecommendPlaces(perPage: number, page: number) {
        const places: string[] = await this.recommendPlaceRepository.findWithoutRegionId(perPage, page);
        return await this.readPlaces(places);
    }

    async createRecommendPlaces(places: CreateRecommendPlaceDTO[]) {
        const promise = places.map(async(place: CreateRecommendPlaceDTO) => {
            const exist = await this.recommendPlaceRepository.findOne({ where: { placeId: place.placeId }})
            if (exist) return exist;
            const regionId = await this.regionService.readRegionId(place.coordinates);
            const recommendPlace = new RecommendPlace(place.placeId, regionId);
            return recommendPlace;
        })
        const newPlaces: RecommendPlace[] = await Promise.all(promise);
        await this.recommendPlaceRepository.save(newPlaces);
    }

    async deleteRecommendPlace(recommendId: number) {
        const recommend = await this.recommendPlaceRepository.findOne(recommendId);
        await this.recommendPlaceRepository.softRemove(recommend);
    }
}
