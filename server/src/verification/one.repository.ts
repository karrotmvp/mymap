import { EntityRepository, Repository } from "typeorm";
import { One } from "./entities/one.entity";

@EntityRepository(One)
export class OneRepository extends Repository<One> {
    
}