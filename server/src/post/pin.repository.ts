import { EntityRepository, Repository } from "typeorm";
import { CreatePinDTO } from "./dto/create-pin.dto";
import { Pin } from "./entities/pin.entity";

@EntityRepository(Pin)
export class PinRepository extends Repository<Pin> {
    async savePins(pins: CreatePinDTO[]): Promise<Pin[]> {
        const promise = pins.map(async(pin) => {
            const newPin = new Pin(pin.review, pin.placeId);
            await this.save(newPin);
            return newPin;
        })
        const newPins:Pin[] = await Promise.all(promise);
        return newPins;
    }

    async deletePostPins(postId: number) {
        const pins = await this.find({
            relations: ['post'],
            where: (qb) => {
                qb.where('Pin__post.postId = :postId', { postId: postId })
            }
        })
        await this.softRemove(pins);
    }
}
