import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { Event } from 'src/event/event';
import { MyMapEvent } from 'src/event/event-pub-sub';
import { CoordinatesDTO } from 'src/place/dto/coordinates.dto';
import { PlaceDTO } from 'src/place/dto/place.dto';
import { PlaceService } from 'src/place/place.service';
import { RegionService } from 'src/region/region.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePinDTO } from './dto/create-pin.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { FeedDTO } from './dto/feed.dto';
import { PinDTO } from './dto/pin.dto';
import { PostDTO } from './dto/post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Pin } from './entities/pin.entity';
import { Post } from './entities/post.entity';
import { SavedPost } from './entities/savedPost.entity';
import { PinRepository } from './pin.repository';
import { PostRepository } from './post.repository';
import { SavedPostRepository } from './savedPost.repository';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly pinRepository: PinRepository,
        private readonly userService: UserService,
        private readonly placeService: PlaceService,
        private readonly savedPostRepository: SavedPostRepository,
        private readonly regionService: RegionService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async createPost(userId: number, post: CreatePostDTO) {
        const user: User = await this.userService.readUser(userId);
        const pins: Pin[] = post.pins ? await this.pinRepository.savePins(post.pins) : null;
        const regionName = post.regionId ? await this.regionService.readRegionName(post.regionId) : null;
        const newPost: Post = await this.postRepository.savePost(post, regionName, user, pins);
        this.eventEmitter.emit(MyMapEvent.POST_CREATED, new Event(newPost.getPostId(), null));
        return newPost;
    }

    async updatePost(userId: number, postId: number, post: UpdatePostDTO) {
        const existPost = await this.postRepository.findOne(postId, { relations: ['user'] })
        if (!existPost) throw new BadRequestException();
        if (existPost.getUser().getUserId() !== userId) throw new NotAcceptableException();
        await this.pinRepository.deletePostPins(postId);
        const pins: Pin[] = post.pins ? await this.pinRepository.savePins(post.pins) : null;
        const regionName: string = post.regionId ? await this.regionService.readRegionName(post.regionId) : null;
        return await this.postRepository.updatePost(postId, post, pins, regionName);
}

    async readPostDetail(userId: number, postId: number): Promise<PostDTO> {
        const coordinate: CoordinatesDTO = new CoordinatesDTO();
        const post: Post = await this.postRepository.findWithPostId(postId);
        if (!post) throw new BadRequestException();
        if (!post.getShare() && post.getUser().getUserId() !== userId) throw new BadRequestException();
        const user: UserDTO = await this.userService.readUserDetail(post.getUser().getUserId());
        const detailPins: PinDTO[] = await this.readPinDetail(post.pins, coordinate);
        const savedNum: number = await this.savedPostRepository.countSavedNum(postId);
        const detailPost: PostDTO = new PostDTO(post, user, detailPins, coordinate, savedNum);
        const saved = await this.checkSaved(userId, postId);
        detailPost.setSaved(saved);
        return detailPost;
    }

    async readPostList(userId: number, posts: Post[]): Promise<FeedDTO> {
        const coordinates = new CoordinatesDTO();
        const promise = posts.map(async(post:Post) => {
            const detailPost:PostDTO = await this.readPostDetail(userId, post.getPostId());
            coordinates.sumCoordinates(detailPost.coordinates);
            return detailPost;
        })
        const detailPosts: PostDTO[] = await Promise.all(promise);
        coordinates.avgCoordinates(detailPosts.length);
        const feed: FeedDTO = new FeedDTO(detailPosts, coordinates);
        return feed;
    }

    private async readPinDetail(pins: Pin[], coordinate: CoordinatesDTO): Promise<PinDTO[]> {
        let places: PlaceDTO[] = [];
        const placeIds:string[] = pins.map((pin: Pin) => pin.getPlaceId())
        if (placeIds.length > 1) {
            places = await this.placeService.readPlaces(placeIds);
        }
        if (placeIds.length == 1) {
            places.push(await this.placeService.readPlace(placeIds[0]));
        }
        const detailPins: PinDTO[] = places.map((place: PlaceDTO) => {
            const placeId = place.placeId;
            coordinate.sumCoordinates(place.coordinates);
            const index = placeIds.findIndex((ele) => ele === placeId);
            const detailPin: PinDTO = new PinDTO(pins[index], place);
            return detailPin;
        })
        coordinate.avgCoordinates(detailPins.length);
        return detailPins;
    }

    async readUserPost(userId: number, page: number, num: number): Promise<FeedDTO> {
        const user: User = await this.userService.readUser(userId);
        const posts: Post[] = await this.postRepository.findWithUserId(user.getUserId(), page, num);
        const detailPost:FeedDTO = await this.readPostList(userId, posts);
        return detailPost
    }

    async deletePost(userId: number, postId: number): Promise<void> {
        const post = await this.postRepository.findOne(postId, {relations: ['pins', 'user']});
        if (!post) throw new BadRequestException();
        if (!(post.getUser().getUserId() === userId || await this.userService.checkAdmin(userId))) throw new NotAcceptableException();
        await this.postRepository.softRemove(post);
    }

    async savePost(userId: number, postId: number): Promise<void> {
        const existSave = await this.savedPostRepository.findWithPostId(userId, postId);
        if (existSave) throw new BadRequestException();
        const post = await this.postRepository.findOne(postId);
        if (!post) throw new NotFoundException();
        const user = await this.userService.readUser(userId);
        const saved = new SavedPost(post, user);
        await this.savedPostRepository.save(saved);
        this.eventEmitter.emit(MyMapEvent.POST_SAVED, new Event(postId, userId));
    }

    async readSavedPost(userId: number, page: number, perPage: number): Promise<FeedDTO> {
        const user: User = await this.userService.readUser(userId);
        const savedPostIds: number[] = await this.savedPostRepository.findWithUserId(user.getUserId(), page, perPage);
        const posts: Post[] = await this.postRepository.findByIds(savedPostIds);
        return await this.readPostList(userId, posts);
    }

    async readRegionPost(userId: number, regionId: string, start: number, end: number, perPage: number) {
        const regions: string[] = await this.regionService.readNeighborRegion(regionId);
        const posts: Post[] = await this.postRepository.findWithRegionId(regions, start, end, perPage);
        return await this.readPostList(userId, posts);
    }

    async deleteSavedPost(userId: number, postId: number) {
        const savedPost: SavedPost = await this.savedPostRepository.findWithPostId(userId, postId);
        if (!savedPost) throw new NotFoundException();
        await this.savedPostRepository.softRemove(savedPost);
    }

    async checkSaved(userId: number, postId: number) {
        const savedPost = await this.savedPostRepository.findWithPostId(userId, postId);
        return savedPost ? true : false;
    }

    async readPost(postId: number): Promise<Post> {
        const post = await this.postRepository.findWithPostId(postId);
        return post;
    }

    async readPins(userId: number): Promise<Pin[]> {
        const posts: Post[] = await this.postRepository.find({
            relations: ['user'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId', { userId: userId })
            }
        })
        const postIds: number[] = posts.map(post => post.getPostId());
        return await this.pinRepository.find({
            relations: ['post'],
            where: (qb) => {
                qb.where('Pin__post.postId IN (:...postId)', { postId: postIds })
            }
        })
    }

    async readPostNum(userId: number): Promise<number> {
        const postNum = await this.postRepository.count({
            relations: ['user'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId', { userId: userId })
            }
        })
        return postNum;
    }

    async countSavedPlaces(placeId: string): Promise<number> {
        return await this.pinRepository.countPinsWithPlaceId(placeId);
    }

    async countMySavedPlaces(userId: number, placeId: string): Promise<number> {
        const posts: Post[] = await this.postRepository.find({
            relations: ['user'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId', { userId: userId })
            }
        })
        const postIds: number[] = posts.map(post => post.getPostId());
        return await this.pinRepository.count({
            relations: ['post'],
            where: (qb) => {
                qb.where('Pin__post.postId IN (:...postId) AND placeId = :placeId', { postId: postIds, placeId: placeId })
            }
        })
    }

    async readDeletedPost(postId: number): Promise<Post> {
        return await this.postRepository.findOne(postId, { withDeleted: true });
    }

    async readPostListInfo(regionId: string, page: number, perPage: number) {
        const result = await this.postRepository.find({
            relations: ['user', 'pins'] ,
            where: regionId ? { regionId: regionId }: {},
            take: perPage,
            skip: page * perPage,
            order: { createdAt: 'DESC' }
        })
        return result;
    }

    async updatePostShare(userId: number, postId: number) {
        const post = await this.postRepository.findOne(postId, {relations: ['pins', 'user']});
        if (!post) throw new BadRequestException();
        if (!(post.getUser().getUserId() === userId || await this.userService.checkAdmin(userId))) throw new NotAcceptableException();
        post.updateShare();
        await this.postRepository.save(post);
    }

    private async savePinInPost(postId: number, pin: CreatePinDTO) {
        const newPin: Pin[] = await this.pinRepository.savePins([pin]);
        const post = await this.postRepository.findOne(postId, { relations: ['pins'] })
        if (!post) throw new BadRequestException();
        post.pins ? post.pins.push(...newPin) : post.pins = newPin;
        await this.postRepository.save(post);
    }

    private async deletePinInPost(postId: number, pin: CreatePinDTO) {
        const deletePin: Pin[] = await this.pinRepository.find({
            relations: ['post'],
            where: (qb) => {
                qb.where('Pin__post.postId = :postId AND placeId = :placeId', { postId: postId, placeId: pin.placeId })
            }
        })
        if (!deletePin) throw new BadRequestException();
        await this.pinRepository.softRemove(deletePin);
    }

    async handlePin(userId: number, postIds: number[], pin: CreatePinDTO) {
        const pins: Pin[] = await this.pinRepository.find({
            relations: ['post'],
            where: { placeId: pin.placeId }
        })
        const includePinPosts: number[] = pins.map(pin => pin.post.getPostId());
        const posts: Post[] = includePinPosts.length ? await this.postRepository.find({
            relations: ['user', 'pins'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId AND postId IN (:...postIds)', { userId: userId, postIds: includePinPosts })
            }
        }) : [];
        const existIds: number[] = posts.map(post => post.getPostId());
        const saveIds: number[] = postIds.filter(x => !existIds.includes(x));
        const deleteIds: number[] = existIds.filter(x => !postIds.includes(x));
        await Promise.all(saveIds.map(async(saveId) => await this.savePinInPost(saveId, pin)));
        await Promise.all(deleteIds.map(async(deleteId) => await this.deletePinInPost(deleteId, pin)));
    }

    async readUserPostInfo(userId: number): Promise<Post[]> {
        const posts: Post[] = await this.postRepository.find({
            relations: ['user', 'pins'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId', { userId: userId });
            },
            order: { createdAt: 'DESC' }
        })
        return posts;
    }
}
