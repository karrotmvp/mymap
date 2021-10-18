import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePinDTO {
    constructor() {}

    @IsOptional()
    readonly review: string;
    
    @IsNotEmpty()
    readonly placeId: string;
}
