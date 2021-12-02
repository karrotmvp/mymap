import { EntityRepository, Repository } from "typeorm";
import { Two } from "./entities/two.entity";

@EntityRepository(Two)
export class TwoRepository extends Repository<Two> {
    
}