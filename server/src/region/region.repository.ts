import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, map } from "rxjs";

@Injectable()
export class RegionRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
        ) {}

    async findNeighborRegion (regionId: string) {
        const uri = this.configService.get('daangn.oapiuri') + 'regions/' + regionId + '/neighbor_regions';
        return this.httpService.get(uri, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            },
            params: {
                range: 'MY'
            }
        }).pipe(
            map((res) => {
                const response = res.data?.data?.region
                if (!response) throw new BadRequestException();
                const regionIds: string[] = response.neighborRegions.map((region) => {
                    return region.id
                })
                return regionIds;
            }), 
            catchError((err) => {
                throw new BadRequestException();
            })
        )
    }

    async findRegionName(regionId: string) {
        const uri = this.configService.get('daangn.oapiuri') + 'regions/' + regionId;
        return this.httpService.get(uri, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            }
        }).pipe(
            map((res) => {
                const response = res.data?.data?.region
                if (!response) throw new BadRequestException();
                return response.name;
            }), 
            catchError((err) => {
                throw new BadRequestException();
            })
        )
    }
}