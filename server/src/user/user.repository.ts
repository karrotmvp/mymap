import { UnauthorizedException } from "@nestjs/common";
import { EntityRepository, In, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findWithUserId(userId: number): Promise<User> {
        const user = await this.findOne(userId);
        if (!user) throw new UnauthorizedException();
        return user;
    }

    async findWithUserIds(userIds: number[]): Promise<User[]> {
        const user = await this.find({
            where: { userId: In(userIds) }
        })
        return user;
    }
}