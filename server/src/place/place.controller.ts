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
    async searchPlace(@Param('regionId') regionId: number, @Query('query') query: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        //regionId string 변환하기
        return await this.placeService.searchPlace(query, regionId, page, perPage);
    }
}
