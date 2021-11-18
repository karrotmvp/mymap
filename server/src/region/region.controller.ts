import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';

@ApiTags('api/region')
@Controller('api/region')
export class RegionController {
    constructor(
        private readonly regionService: RegionService
    ) {}
    
    @Get('/:regionId')
    @ApiOkResponse({ description: '지역 이름 불러오기 성공', type: String })
    async readRegionName(@Param('regionId') regionId: string): Promise<string> {
        return await this.regionService.readRegionName(regionId);
    }
}
