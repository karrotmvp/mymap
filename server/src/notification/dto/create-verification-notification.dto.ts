import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateVerificationNotificationDTO {
    @ApiProperty({ description: '검증 종류', example: 'one' })
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: '검증 아이디 => 이전 단계의 리스폰스에 포함됨' })
    @IsNotEmpty()
    id: number;
}