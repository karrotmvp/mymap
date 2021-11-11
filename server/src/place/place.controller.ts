import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { CreateRecommendPlaceDTO } from './dto/create-recommendPlace.dto';
import { PlaceDTO } from './dto/place.dto';
import { RegionPlaceDTO } from './dto/regionPlace.dto';
import { PlaceService } from './place.service';

@ApiTags('api/place')
@Controller('api/place')
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService,
        private readonly logger: MyLogger,
        private readonly eventEmitter: EventEmitter2,
        private readonly userService: UserService
    ) {}

    @Get('/search/:regionId')
    async searchPlace(@Param('regionId') regionId: string, @Query('query') query: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        this.logger.debug('regionId : ', regionId, ' query : ', query, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        return await this.placeService.searchPlace(query, regionId, page, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/saved')
    @ApiOkResponse({ description: '저장한 장소 모음 불러오기 성공', type: [PlaceDTO] })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readSavedPlaces(@Req() req: any): Promise<PlaceDTO[]> {
        return await this.placeService.readSavedPlaces(req.user.userId);
    }

    @Get('/:placeId')
    async readPlace(@Param('placeId') placeId: string) {
        this.logger.debug('placeId : ', placeId);
        return await this.placeService.readPlace(placeId);
    }

    // @Get('/region/:regionId')
    // async readRegionPlaces(@Param('regionId') regionId: string, @Query('seed') seed: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    //     this.logger.debug('regionId : ', regionId, 'seed : ', seed, 'page', page, ' perPage : ', perPage);
    //     if (!regionId) throw new BadRequestException();
    //     if (page < 1 || perPage < 1) throw new BadRequestException();
    //     if (!seed) seed = await this.placeService.getSeed();
    //     this.eventEmitter.emit(MyMapEvent.PLACE_LISTED, new Event(null, regionId));
    //     return await this.placeService.readRegionPlaces(regionId, seed, perPage, page);
    // }

    @Get('/recommend/:regionId')
    @ApiOkResponse({ description: '둘러보기 리스트 가져오기 성공', type: [RegionPlaceDTO] })
    @ApiQuery({ name: 'seed', description: '랜덤 세션 유지를 위한 seed, 첫 요청에는 필요없어요. 두 번째 페이지 요청부터 담아서 보내주세요(1~51)' })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'perPage', example: 10 })
    async readRecommendPlacesRandom(@Param('regionId') regionId: string, @Query('seed') seed: string, @Query('perPage') perPage: number = 10, @Query('page') page: number = 0): Promise<RegionPlaceDTO> {
        if (!seed) seed = (Math.floor(Math.random() * 50) + 1).toString();
        return await this.placeService.readRecommendPlacesRandom(regionId, Number(seed), perPage, page);
    }

    @UseGuards(JwtAuthGuard)
    @Get('admin/recommend')
    async readRecommendPlaces(@Req() req: any, @Query('perPage') perPage: number, @Query('page') page: number) {
        await this.userService.checkAdmin(req.user.userId);
        return await this.placeService.readRecommendPlaces(perPage, page);
    }

    @UseGuards(JwtAuthGuard)
    @Post('admin/recommend')
    async createRecommendPlaces(@Req() req: any, @Body() places: CreateRecommendPlaceDTO[]) {
        await this.userService.checkAdmin(req.user.userId);
        await this.placeService.createRecommendPlaces(places);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('admin/recommend/:recommendId')
    async deleteRecommendPlace(@Req() req: any, @Param('recommendId') recommendId: number) {
        await this.userService.checkAdmin(req.user.userId);
        await this.placeService.deleteRecommendPlace(recommendId);
    }
}
