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
import { CoordinatesDTO } from './dto/coordinates.dto';
import { UserService } from 'src/user/user.service';
import { SavedPlace } from './entities/savedPlace.entity';
import { User } from 'src/user/entities/user.entity';
import { SavedPlaceRepository } from './savedPlace.repository';
import { In } from 'typeorm';

@Injectable()
export class PlaceService {
    constructor(
        private readonly placeRepository: PlaceRepository,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        private readonly regionService: RegionService,
        private readonly recommendPlaceRepository: RecommendPlaceRepository,
        private readonly userService: UserService,
        private readonly savePlaceRepository: SavedPlaceRepository
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
        place.savedNum = await this.postService.countSavedPlaces(place.placeId);
        return place;
    }

    async readPlaces(placeIds: string[], userId?: number): Promise<PlaceDTO[]> {
        if (!placeIds || placeIds.length === 0) return [];
        const places$ = await this.placeRepository.findWithIds(placeIds);
        const places = await lastValueFrom(places$);
        const promise = places.map(async(place) => {
            place.savedNum = userId ? await this.postService.countMySavedPlaces(userId, place.placeId) : await this.postService.countSavedPlaces(place.placeId);
        })
        await Promise.all(promise);
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

    // Deprecated
    // async readRegionPlaces(regionId: string, seed: string, perPage: number, page: number): Promise<RegionPlaceDTO> {
    //     const regionNum = await this.convertId(regionId);
    //     const places$ = await this.placeRepository.findWithRegion(regionNum, seed, perPage, page);
    //     const places: PlaceDTO[] = await lastValueFrom(places$);
    //     const promise = places.map(async(place) => {
    //         place.saved = await this.postService.countSavedPlaces(place.placeId);
    //         return place
    //     })
    //     const newPlaces:PlaceDTO[] = await Promise.all(promise);
    //     const regionPlace = new RegionPlaceDTO(newPlaces, seed);
    //     return regionPlace;
    // }

    async readRecommendPlacesRandom(regionId: string, seed: number, perPage: number, page: number): Promise<RegionPlaceDTO> {
        const regions = await this.regionService.readNeighborRegion(regionId, 'RANGE_2');
        const rec_places: string[] = await this.recommendPlaceRepository.findWithRegionId(regions, seed, perPage, page);
        const places: PlaceDTO[] = await this.readPlaces(rec_places);
        const coordinates = new CoordinatesDTO();
        places.map(place => coordinates.sumCoordinates(place.coordinates));
        coordinates.avgCoordinates(places.length);
        const regionPlace = new RegionPlaceDTO(places, seed.toString(), coordinates);
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
        const placeIds = places.map(place => place.placeId)
        return await this.readPlaces(placeIds);
    }

    async deleteRecommendPlace(placeId: string) {
        const recommend = await this.recommendPlaceRepository.findOne({ where: { placeId: placeId }});
        await this.recommendPlaceRepository.softRemove(recommend);
    }

    async countRecommendPlacesByRegion(regionId: string) {
        const regionIds: string[] = await this.regionService.readNeighborRegion(regionId, 'RANGE_2');
        const num: number = await this.recommendPlaceRepository.count({
            where: (qb) => {
                qb.where('regionId IN (:...regionId)', { regionId: regionIds })
            }
        })
        return num;
    }

    async readSavedPlaces(userId: number): Promise<PlaceDTO[]> {
        // A
        // const pins: Pin[] = await this.postService.readPins(userId);
        // const places: string[] = pins.map(pin => pin.getPlaceId());
        // const placeIds: string[] = [...new Set(places)];
        // return await this.readPlaces(placeIds, userId);
        const savedPlaces: SavedPlace[] = await this.savePlaceRepository.find({
            relations: ['user'],
            where: (qb) => {
                qb.where('SavedPlace__user.userId = :userId', { userId: userId })
            }
        })
        const placeIds: string[] = savedPlaces.map(savedPlace => {
            return savedPlace.getPlaceId()
        })
        return await this.readPlaces(placeIds, userId);
    }

    async createSavedPlaces(userId: number, placeIds: string[]): Promise<void> {
        const user: User = await this.userService.readUser(userId);
        const exist: SavedPlace[] = await this.savePlaceRepository.find({
            where: { placeId: In(placeIds) }
        })
        const existPlaceIds: string[] = exist.map(_ => _.getPlaceId());
        placeIds = placeIds.filter(placeId => !existPlaceIds.includes(placeId));
        const newSavedPlaces: SavedPlace[] = placeIds.map(placeId => {
            const newSavedPlace = new SavedPlace(user, placeId);
            return newSavedPlace;
        })
        await this.savePlaceRepository.save(newSavedPlaces);
    }
}
