import { UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findWithUserId(userId: number): Promise<User> {
        const user = await this.findOne(userId);
        if (!user) throw new UnauthorizedException();
        return user;
    }
    
    async saveUser(user: CreateUserDTO): Promise<CreateUserDTO> {
        let existUser = await this.findOne({ where: { uniqueId: user.getUniqueId() }})
        if (!existUser) {
            existUser = new User(user.getUniqueId(), user.getToken())
        } else {
            existUser.setToken(user.getToken());
        }
        const result = await this.save(existUser);
        user.setUserId(result.getUserId());
        return user;
    }
    
}