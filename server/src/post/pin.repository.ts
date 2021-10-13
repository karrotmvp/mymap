import { EntityRepository, Repository } from "typeorm";
import { CreatePinDTO } from "./dto/create-pin.dto";
import { Pin } from "./entities/pin.entity";

@EntityRepository(Pin)
export class PinRepository extends Repository<Pin> {
    async savePins(pins: CreatePinDTO[]): Promise<Pin[]> {
        const newPins:Pin[] = [];
        pins.map(async(pin) => {
            const newPin = new Pin(pin.contents, pin.placeId);
            newPins.push(newPin);
            await this.save(newPin);
        })
        return newPins;
    }
}
