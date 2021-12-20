import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventEmitter2 } from 'eventemitter2';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { MyLogger } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { CreateNewPlaceDTO } from './dto/create-newPlace.dto';
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

    @Roles(Role.Unsigned_User)
    @UseGuards(RolesGuard)
    @Get('/search/:regionId')
    @ApiOkResponse({ description: '장소 이름으로 검색 성공', type: [PlaceDTO] })
    @ApiQuery({ name: 'page', example: 1, required: false })
    @ApiQuery({ name: 'perPage', example: 10, required: false })
    async searchPlace(@Param('regionId') regionId: string, @Query('query') query: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
        this.logger.debug('regionId : ', regionId, ' query : ', query, ' page : ', page, ' perPage : ', perPage);
        if (page < 1 || perPage < 1) throw new BadRequestException();
        return await this.placeService.searchPlace(query, regionId, page, perPage);
    }
    
    @Roles(Role.Signed_User)
    @UseGuards(RolesGuard)
    @Get('/saved')
    @ApiOkResponse({ description: '저장한 장소 모음 불러오기 성공', type: [PlaceDTO] })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readSavedPlaces(@Req() req: any): Promise<PlaceDTO[]> {
        return await this.placeService.readSavedPlaces(req.user.userId);
    }

    @Roles(Role.Unsigned_User)
    @UseGuards(RolesGuard)
    @Get('/:placeId')
    async readPlace(@Param('placeId') placeId: string) {
        this.logger.debug('placeId : ', placeId);
        return await this.placeService.readPlace(placeId);
    }

    @Roles(Role.Unsigned_User)
    @UseGuards(RolesGuard)
    @Get('/detail/:placeId')
    @ApiOkResponse({ description: '장소 상세 정보 불러오기 성공', type: PlaceDTO })
    // @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readPlaceDetail(@Req() req: any, @Param('placeId') placeId: string) {
        return await this.placeService.readPlaceDetail(req.user.userId, placeId);
    }

    @Roles(Role.Unsigned_User)
    @UseGuards(RolesGuard)
    @Post('/new/:regionId')
    @ApiCreatedResponse({ description: '새로운 장소 등록 완료' })
    @ApiBody({ description: '새로운 장소 등록 형식', type: CreateNewPlaceDTO })
    async createNewPlace(@Param('regionId') regionId: string, @Body() createNewPlaceDTO: CreateNewPlaceDTO) {
        await this.placeService.createNewPlace(regionId, createNewPlaceDTO);
    }

    // Deprecated
    // @Get('/region/:regionId')
    // async readRegionPlaces(@Param('regionId') regionId: string, @Query('seed') seed: string, @Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    //     this.logger.debug('regionId : ', regionId, 'seed : ', seed, 'page', page, ' perPage : ', perPage);
    //     if (!regionId) throw new BadRequestException();
    //     if (page < 1 || perPage < 1) throw new BadRequestException();
    //     if (!seed) seed = await this.placeService.getSeed();
    //     this.eventEmitter.emit(MyMapEvent.PLACE_LISTED, new Event(null, regionId));
    //     return await this.placeService.readRegionPlaces(regionId, seed, perPage, page);
    // }

    @Roles(Role.Unsigned_User)
    @UseGuards(RolesGuard)
    @Get('/recommend/:regionId')
    @ApiOkResponse({ description: '둘러보기 리스트 가져오기 성공', type: [RegionPlaceDTO] })
    @ApiQuery({ name: 'seed', description: '랜덤 세션 유지를 위한 seed, 첫 요청에는 필요없어요. 두 번째 페이지 요청부터 담아서 보내주세요(1~51)' })
    @ApiQuery({ name: 'page', example: 0, required: false })
    @ApiQuery({ name: 'perPage', example: 10, required: false })
    async readRecommendPlacesRandom(@Param('regionId') regionId: string, @Query('seed') seed: string, @Query('perPage') perPage: number = 10, @Query('page') page: number = 0): Promise<RegionPlaceDTO> {
        if (!seed) seed = (Math.floor(Math.random() * 50) + 1).toString();
        this.eventEmitter.emit(MyMapEvent.PLACE_LISTED, new Event(null, regionId));
        return await this.placeService.readRecommendPlacesRandom(regionId, Number(seed), perPage, page);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get('admin/recommend')
    async readRecommendPlaces(@Req() req: any, @Query('perPage') perPage: number = 20, @Query('page') page: number = 0) {
        return await this.placeService.readRecommendPlaces(perPage, page);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get('admin/recommend/region')
    async countRecommendPlacesByRegion(@Req() req: any) {
        const seocho = await this.placeService.countRecommendPlacesByRegion("471abc99b378");
        const jamsil = await this.placeService.countRecommendPlacesByRegion("5424e9f7ec6d");
        const hannam = await this.placeService.countRecommendPlacesByRegion("79f5f58de451");
        return {
            "서초동": seocho,
            "한남동": hannam,
            "잠실동": jamsil
        }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('admin/recommend')
    async createRecommendPlaces(@Req() req: any, @Body() places: CreateRecommendPlaceDTO[]) {
        return await this.placeService.createRecommendPlaces(places);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Delete('admin/recommend/:placeId')
    async deleteRecommendPlace(@Req() req: any, @Param('placeId') placeId: string) {
        await this.placeService.deleteRecommendPlace(placeId);
    }
}
