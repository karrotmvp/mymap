import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, map } from "rxjs";
import { CoordinatesDTO } from "src/place/dto/coordinates.dto";

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
                range: 'ADJACENT'
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
                console.log(err)
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

    async findRegionId(coordinate: CoordinatesDTO) {
        const uri = this.configService.get('daangn.oapiuri') + 'regions/by_coords';
        return this.httpService.get(uri, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            },
            params: {
                lat: coordinate.latitude,
                lng: coordinate.longitude,
            }
        }).pipe(
            map((res) => {
                const response = res.data?.data?.regions
                if (!response) throw new BadRequestException();
                return response[0].id;
            }), 
            catchError((err) => {
                throw new BadRequestException();
            })
        )
    }

    async findRealRegionId(regionId: string) {
        const uri = this.configService.get('daangn.oapiuri') + 'regions/' + regionId;
        return this.httpService.get(uri, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            }
        }).pipe(
            map((res) => {
                const response = res.data?.data?.region
                if (!response) throw new BadRequestException();
                return response.name3Id;
            }),
            catchError((err) => {
                throw new BadRequestException();
            })
        )
    }
}