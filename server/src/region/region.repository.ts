import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { map } from "rxjs";

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
        }).pipe(map((res) => {
            const regionIds: string[] = res.data.data.region.neighborRegions.map((region) => {
                return region.id
            })
            return regionIds;
        }))
    }

    async findRegionName(regionId: string) {
        const uri = this.configService.get('daangn.oapiuri') + 'regions/' + regionId;
        return this.httpService.get(uri, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            }
        }).pipe(map((res) => {
            return res.data.data.region.name;
        }))
    }
}