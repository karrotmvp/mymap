import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, map } from "rxjs";
import { PlaceDTO } from "./dto/place.dto";

@Injectable()
export class PlaceRepository {
    constructor (
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async findOne(placeId: string) {
        const uri = this.configService.get('daangn.poiuri') + placeId;
        return this.httpService.get(uri).pipe(
            map((res) => {
                const place = new PlaceDTO(res.data);
                return place;
            }), 
            catchError(e => {
                throw new BadRequestException();
            })
        )
    }

    async findWithIds(placeIds: string[]) {
        const uri = this.configService.get('daangn.poiuri') + 'by-ids';
        return this.httpService.get(uri, {
            params: {
                ids: placeIds
            }
        }).pipe(
            map((res) => {
                const places: PlaceDTO[] = res.data.map((place) => {
                    const newPlace = new PlaceDTO(place);
                    return newPlace;
                })
                return places;
            }),
            catchError(e => {
                throw new BadRequestException();
            })
        )

    }

    async findWithName(query: string, regionId: number, page: number, perPage: number) {
        const uri = this.configService.get('daangn.poiuri') + 'search';
        return this.httpService.get(uri, {
            params: {
                query: query,
                regionId: regionId,
                regionRange: 'RANGE2',
                page: page,
                perPage: perPage
            }
        }).pipe(
            map((res) => {
                const places: PlaceDTO[] = res.data.items.map(place => {
                    const newPlace = new PlaceDTO(place);
                    return newPlace
                })
                return places;
            }), 
            catchError(e => {
                throw new BadRequestException();
            })
        )
    }

    async findWithRegion(regionId: number, seed: string, perPage: number, page:number) {
        const uri = this.configService.get('daangn.poiuri') + 'by-region-id';
        return this.httpService.get(uri, {
            params: {
                regionId: regionId,
                seed: seed,
                perPage: perPage,
                page: page,
            }
        }).pipe(
            map((res) => {
                const places: PlaceDTO[] = res.data.items.map((place) => {
                    const newPlace = new PlaceDTO(place);
                    return newPlace;
                })
                return places;
            }), 
            catchError(e => {
                throw new BadRequestException();
            })
        )
    }

    async getSeed() {
        const uri = this.configService.get('daangn.poiuri') + 'seed'
        return this.httpService.get(uri).pipe(
            map((res) => {
                return res.data.seed;
            }), 
            catchError(e => {
                throw new BadRequestException();
            })
        )
    }
}