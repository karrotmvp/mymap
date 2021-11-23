import { EntityRepository, Repository } from "typeorm";
import { SavedPlace } from "./entities/savedPlace.entity";

@EntityRepository(SavedPlace)
export class SavedPlaceRepository extends Repository<SavedPlace> {}
