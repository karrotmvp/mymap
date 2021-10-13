import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async login(user: CreateUserDTO):Promise<CreateUserDTO> {
        try {
            return await this.userRepository.saveUser(user);
        } catch (e) {
            throw e;
        }
    }

    async readUser(userId: number): Promise<User> {
        return await this.userRepository.findWithUserId(userId);
    }

    async readUserDetail(user: User): Promise<UserDTO> {
        //dependency
        return
    }
}
