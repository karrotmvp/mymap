import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('api/place')
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService
    ) {}

    @Get('/:placeId')
    async readPlace(@Param('placeId') placeId: string) {
        return await this.placeService.readPlace(placeId);
    }

    @Get('/search/:regionId')
    async searchPlace(@Param('regionId') regionId: string, @Query('query') query: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        return await this.placeService.searchPlace(query, regionId, page, perPage);
    }

    @Get('/region/:regionId')
    async readRegionPlaces(@Param('regionId') regionId: string, @Query('perPage') perPage: number = 10) {
        return await this.placeService.readRegionPlaces(regionId, perPage);
    }
}
