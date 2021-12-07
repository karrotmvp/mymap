import { EntityRepository, Repository } from "typeorm";
import { NewPlace } from "./entities/newPlace.entity";

@EntityRepository(NewPlace)
export class NewPlaceRepository extends Repository<NewPlace> {
    
}