import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ApiKeyAuthGuard } from "src/auth/apiKey.guard";
import { Role } from "src/auth/role.enum";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { PlaceDTO } from "./dto/place.dto";
import { PlaceService } from "./place.service";

@ApiTags('api/savedPlaces')
@Controller('api/savedPlaces')
export class SavedPlaceController {
    constructor(
        private readonly placeService: PlaceService
    ) {}

    @Roles(Role.Signed_User)
    @UseGuards(RolesGuard)
    @Get('/')
    @ApiOkResponse({ description: '저장한 장소 모음 불러오기 성공', type: [PlaceDTO] })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async readMySavedPlaces(@Req() req: any) {
        return await this.placeService.readSavedPlaces(req.user.userId);
    }

    @Roles(Role.Signed_User)
    @UseGuards(RolesGuard)
    @Post('/')
    @ApiCreatedResponse({ description: '장소 저장 성공' })
    @ApiQuery({ name: 'placeId', example: '[12345, 24567]', description: '저장할 placeId 배열' })
    @ApiHeader({ 'name': 'Authorization', description: 'JWT token Bearer' })
    async createSavedPlaces(@Req() req: any, @Query('placeId') placeIds: string[]) {
        await this.placeService.createSavedPlaces(req.user.userId, placeIds);
    }

    // Deprecated
    // @UseGuards(ApiKeyAuthGuard)
    // @Post('/pin')
    // async convertToPins(@Query('userId') userId: number) {
    //     await this.placeService.convertToPins(userId);
    // }
}
