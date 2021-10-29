import { EntityRepository, Repository } from "typeorm";
import { PreopenUser } from "./entities/preopen-user.entity";

@EntityRepository(PreopenUser)
export class PreopenUserRepository extends Repository<PreopenUser> {
}