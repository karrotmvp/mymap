import { CreatePinDTO } from "./create-pin.dto";

export class CreatePostDTO {
    constructor() {}

    readonly title: string;
    readonly regionId: string;
    readonly share: boolean;
    readonly pins: CreatePinDTO[];
}