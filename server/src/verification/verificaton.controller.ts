import { Body, Controller, Post, Query } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateFourDTO } from "./dto/create-four.dto";
import { CreateOneDTO } from "./dto/create-one.dto";
import { CreateTwoDTO } from "./dto/create-two.dto";
import { Four } from "./entities/four.entity";
import { One } from "./entities/one.entity";
import { Two } from "./entities/two.entity";
import { VerificationService } from "./verification.service";

@ApiTags('api/verifications')
@Controller('api/verifications')
export class VerificationController {
    constructor(
        private readonly verificationService: VerificationService
    ) {}


    @Post('/one')
    @ApiCreatedResponse({ description: 'one 응답 제출 완료', type: One })
    @ApiBody({ description: 'one 응답 형식', type: CreateOneDTO })
    async createOneAnswer(@Body() createOneDTO: CreateOneDTO) {
        return await this.verificationService.createOneAnswer(createOneDTO);
    }

    @Post('/two')
    @ApiCreatedResponse({ description: 'two 응답 제출 완료', type: Two })
    @ApiBody({ description: 'two 응답 형식', type: CreateTwoDTO })
    async createTwoAnswer(@Body() createTwoDTO: CreateTwoDTO) {
        return await this.verificationService.createTwoAnswer(createTwoDTO);
    }

    @Post('/four')
    @ApiCreatedResponse({ description: 'four 응답 제출 완료', type: Four })
    @ApiBody({ description: 'four 응답 형식', type: CreateFourDTO })
    async createFourAnswer(@Body() createFourDTO: CreateFourDTO) {
        return await this.verificationService.createFourAnswer(createFourDTO);
    }

}
