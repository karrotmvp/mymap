import { EntityRepository, Repository } from "typeorm";
import { Four } from "./entities/four.entity";

@EntityRepository(Four)
export class FourRepository extends Repository<Four> {
    
}