import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from 'eventemitter2';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { LessThan } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { PreopenUser } from './entities/preopen-user.entity';
import { User } from './entities/user.entity';
import { PreopenUserRepository } from './preopen-user.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly preopenUserReposiotry: PreopenUserRepository,
        private readonly eventEmitter: EventEmitter2
        ) {}

    async login(user: CreateUserDTO, regionId: string):Promise<CreateUserDTO> {
        let existUser: User = await this.userRepository.findOne({ where: { uniqueId: user.getUniqueId() }})
        let isNew: boolean = false;
        if (!existUser) {
            existUser = new User(user.getUniqueId(), user.getToken())
            isNew = true;
        } else {
            existUser.setToken(user.getToken());
        }
        const savedUser = await this.userRepository.save(existUser);
        user.setUserId(savedUser.getUserId());
        if(isNew) this.eventEmitter.emit(MyMapEvent.USER_CREATED, new Event(savedUser.getUserId(), regionId))
        return user;
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

    async createPreopenUser(userId: number, regionId: string): Promise<void> {
        const existPreopen = await this.preopenUserReposiotry.findOne({
            relations: ['user'],
            where: (qb) => {
                qb.where('PreopenUser__user.userId = :userId', { userId: userId })
            }
        })
        if (existPreopen) return;
        const user: User = await this.readUser(userId);
        if (!user) throw new UnauthorizedException();
        const preopenUser: PreopenUser = new PreopenUser(user, regionId);
        this.preopenUserReposiotry.save(preopenUser);
    }

    async readPreopenUsers(): Promise<User[]> {
        return await this.userRepository.find({
            where: { createdAt: LessThan('2021-11-09') }
        })
    }

    // admin

    async readAdmin(): Promise<User> {
        return await this.userRepository.findOne({ where: { isAdmin: true } });
    }
    async checkAdmin(userId: number): Promise<boolean> {
        const user: User = await this.userRepository.findOne(userId);
        if (!user || !user.getIsAdmin()) throw new UnauthorizedException();
        return true;
    }

    async readUserList(page: number, perPage: number): Promise<User[]> {
        return await this.userRepository.find({
            relations: ['posts', 'savedPosts'],
            take: perPage,
            skip: page * perPage
        })
    }
    
    // Deprecated
    // async setPreopenUserSended(preopenUserId: number) {
    //     const preopenUser: PreopenUser = await this.preopenUserReposiotry.findOne(preopenUserId);
    //     return await this.preopenUserReposiotry.softRemove(preopenUser);
    // }
    // 
    // async readUnwrittenUserId(): Promise<number[]> {
    //     const user = (await this.userRepository.find({
    //         relations: ['posts'],
    //     })).filter(x => x.posts.length === 0).map(x => x.getUserId());
    //     const unwrittenUser = [...new Set(user)];
    //     return unwrittenUser
    // }
}