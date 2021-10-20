import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, Put, UnauthorizedException } from '@nestjs/common';
import { MixpanelProvider } from 'src/logger/mixpanel.provider';
import { CoordinatesDTO } from 'src/place/dto/coordinates.dto';
import { PlaceDTO } from 'src/place/dto/place.dto';
import { PlaceService } from 'src/place/place.service';
import { RegionService } from 'src/region/region.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { EventEmitter } from 'stream';
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
        private readonly mixPanel: MixpanelProvider
    ) {}

    async createPost(userId: number, post: CreatePostDTO) {
        try {
            const user: User = await this.userService.readUser(userId);
            const pins: Pin[] = await this.pinRepository.savePins(post.pins);
            const regionName: string = await this.regionService.readRegionName(post.regionId);
            const newPost: Post = await this.postRepository.savePost(post, regionName, user, pins);
            this.mixPanel.mixpanel.people.set_once(userId.toString(), 'first_post_created', (new Date().toISOString()))
            this.mixPanel.mixpanel.people.increment(userId.toString(), 'postNum');
            this.mixPanel.mixpanel.track('createPost', {
                regionId: post.regionId,
                pinNum: post.pins.length,
                share: post.share
            });

            

            

            return newPost;
        } catch (e) {
            throw e;
        }
    }

    async updatePost(userId: number, postId: number, post: UpdatePostDTO) {
        try {
            const existPost = await this.postRepository.findOne(postId, { relations: ['user'] })
            if (!existPost) throw new BadRequestException();
            if (existPost.getUser().getUserId() !== userId) throw new NotAcceptableException();
            await this.pinRepository.deletePostPins(postId);
            const pins: Pin[] = await this.pinRepository.savePins(post.pins);
            await this.postRepository.updatePost(postId, post, pins);
        } catch (e) {
            throw e;
        }
    }

    async readPost(postId: number): Promise<PostDTO> {
        try {
            const coordinate: CoordinatesDTO = new CoordinatesDTO();
            const post: Post = await this.postRepository.findWithPostId(postId);
            if (!post) throw new BadRequestException();
            const user: UserDTO = await this.userService.readUserDetail(post.getUser());
            const detailPins: PinDTO[] = await this.readPinDetail(post.pins, coordinate);
            const detailPost: PostDTO = new PostDTO(post, user, detailPins, coordinate);
            return detailPost;
        } catch (e) {
            throw e;
        }
    }

    async readPostList(posts: Post[]): Promise<FeedDTO> {
        try {
            const coordinates = new CoordinatesDTO();
            const promise = posts.map(async(post:Post) => {
                const detailPost:PostDTO = await this.readPost(post.getPostId());
                coordinates.sumCoordinates(detailPost.coordinates);
                return detailPost;
            })
            const detailPosts: PostDTO[] = await Promise.all(promise);
            coordinates.avgCoordinates(detailPosts.length);
            const feed: FeedDTO = new FeedDTO(detailPosts, coordinates);
            return feed;
        } catch (e) {
            throw e;
        }
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
        try {
            const user: User = await this.userService.readUser(userId);
            const posts: Post[] = await this.postRepository.findWithUserId(user.getUserId(), page, num);
            const detailPost:FeedDTO = await this.readPostList(posts);
            return detailPost
        } catch (e) {
            throw e;
        }
    }

    async deletePost(userId: number, postId: number): Promise<void> {
        try {
            const post = await this.postRepository.findOne(postId, {relations: ['pins']});
            if (!post) throw new BadRequestException();
            if (post.getUser().getUserId() !== userId) throw new NotAcceptableException();
            await this.postRepository.softRemove(post);
        } catch (e) {
            throw e;
        }
    }

    async savePost(userId: number, postId: number): Promise<void> {
        try {
            const existSave = await this.savedPostRepository.findWithPostId(userId, postId);
            if (existSave) throw new BadRequestException();
            const post = await this.postRepository.findOne(postId);
            if (!post) throw new NotFoundException();
            const user = await this.userService.readUser(userId);
            const saved = new SavedPost(post, user);
            await this.savedPostRepository.save(saved);
        } catch (e) {
            throw e;
        }
    }

    async readSavedPost(userId: number, page: number, perPage: number): Promise<FeedDTO> {
        try {
            const user: User = await this.userService.readUser(userId);
            const savedPostIds: number[] = await this.savedPostRepository.findWithUserId(user.getUserId(), page, perPage);
            const posts: Post[] = await this.postRepository.findByIds(savedPostIds);
            return await this.readPostList(posts);
        } catch (e) {
            throw e;
        }
    }

    async readRegionPost(regionId: string, start: number, end: number, perPage: number) {
        try {
            const regions: string[] = await this.regionService.readNeighborRegion(regionId);
            const posts: Post[] = await this.postRepository.findWithRegionId(regions, start, end, perPage);
            return await this.readPostList(posts);
        } catch (e) {
            throw e;
        }
    }

    async deleteSavedPost(userId: number, postId: number) {
        try {
            const savedPost: SavedPost = await this.savedPostRepository.findWithPostId(userId, postId);
            if (!savedPost) throw new NotFoundException();
            await this.savedPostRepository.softRemove(savedPost);
        } catch (e) {
            throw e;
        }
    }

    async checkSaved(userId: number, postId: number) {
        try {
            const savedPost = await this.savedPostRepository.findWithPostId(userId, postId);
            return savedPost ? true : false;
        } catch (e) {
            throw e;
        }
    }
}
