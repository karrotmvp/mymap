import { Injectable } from '@nestjs/common';
import { MixpanelProvider } from 'src/logger/mixpanel.provider';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mixPanel: MixpanelProvider,
        ) {}

    async login(user: CreateUserDTO):Promise<CreateUserDTO> {
        try {
            const savedUser: CreateUserDTO = await this.userRepository.saveUser(user);
            this.mixPanel.mixpanel.people.set(user.getUserId().toString(), {
                $userName: user.getUserName(),
                postNum: 0,
            })
            this.mixPanel.mixpanel.people.set_once(user.getUserId().toString(), '$created', (new Date().toISOString()))
            return savedUser;
        } catch (e) {
            throw e;
        }
    }

    async readUser(userId: number): Promise<User> {
        return await this.userRepository.findWithUserId(userId);
    }

    async readUserDetail(user: User): Promise<UserDTO> {
        //dependency
        return new UserDTO(user.getUserId(), null, null, null, null);
    }
}
