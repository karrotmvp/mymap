import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
        ) {}

    async login(user: CreateUserDTO):Promise<CreateUserDTO> {
        const savedUser: CreateUserDTO = await this.userRepository.saveUser(user);
        return savedUser;
    }

    async readUser(userId: number): Promise<User> {
        return await this.userRepository.findWithUserId(userId);
    }

    async readUserDetail(userId: number): Promise<UserDTO> {
        const user = await this.readUser(userId);
        const uniqueId = user.getUniqueId();
        const uri = this.configService.get('daangn.oapiuri') + 'users/' + uniqueId;
        const userDetail$ = this.httpService.get(uri, {
            headers: {
                'X-Api-Key': this.configService.get('daangn.api_key')
            }}).pipe(
                map((res) => {
                    const response = res.data?.data?.user
                    if (!response) throw new BadRequestException();
                    return new UserDTO(userId, response.nickname, response.profileImageUrl, null, null)
                }),
                catchError((err) => {
                    throw new BadRequestException();
                })
            )
        return await lastValueFrom(userDetail$);
    }
}
