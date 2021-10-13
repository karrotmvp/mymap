import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { map } from "rxjs";
import { PlaceDTO } from "./dto/place.dto";

@Injectable()
export class PlaceRepository {
    constructor (
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async findOne(placeId: string) {
        const uri = this.configService.get('daangn.poiuri') + '/api/mvp/pois/' + placeId;
        return this.httpService.get(uri).pipe(map(async(res) => {
            const place = new PlaceDTO(res.data);
            return place;
        }))
    }

    async findWithIds(placeIds: string[]) {
        const uri = this.configService.get('daangn.poiuri') + '/api/mvp/pois/by-ids';
        return this.httpService.get(uri, {
            params: {
                ids: placeIds
            }
        }).pipe(map(async(res) => {
            const places: PlaceDTO[] = [];
            res.data.map(async(place) => {
                const newPlace = new PlaceDTO(place);
                places.push(newPlace);
            })
            return places;
        }))
    }

    async findWithName(query: string, regionId: number, page: number, perPage: number) {
        const uri = this.configService.get('daangn.poiuri') + '/api/mvp/pois/search';
        return this.httpService.get(uri, {
            params: {
                query: query,
                regionId: regionId,
                page: page,
                perPage: perPage
            }
        }).pipe(map(async(res) => {
            const places: PlaceDTO[] = [];
            res.data.map(async(place) => {
                const newPlace = new PlaceDTO(place);
                places.push(newPlace);
            })
            return places;
        }))
    }
}