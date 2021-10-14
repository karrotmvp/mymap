import { BadRequestException, Injectable, NotAcceptableException, Put } from '@nestjs/common';
import { PlaceDTO } from 'src/place/dto/place.dto';
import { PlaceService } from 'src/place/place.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { PinDTO } from './dto/pin.dto';
import { PostDTO } from './dto/post.dto';
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
        private readonly savedPostRepository: SavedPostRepository
    ) {}

    async createPost(userId: number, post: CreatePostDTO) {
        try {
            const pins: Pin[] = await this.pinRepository.savePins(post.pins);
            const user: User = await this.userService.readUser(userId);
            await this.postRepository.savePost(post, user, pins);
        } catch (e) {
            throw e;
        }
    }

    async readPost(postId: number): Promise<PostDTO> {
        try {//핀 중심값 계산해서 내리기
            const post: Post = await this.postRepository.findWithPostId(postId);
            if (!post) throw new BadRequestException();
            const user: UserDTO = await this.userService.readUserDetail(post.getUser());
            const detailPins: PinDTO[] = await this.readPinDetail(post.pins);
            const detailPost: PostDTO = new PostDTO(post, user, detailPins);
            return detailPost;
        } catch (e) {
            throw e;
        }
    }

    async readPostList(posts: Post[]): Promise<PostDTO[]> {
        try {
            const promise = posts.map(async(post:Post) => {
                const detailPost:PostDTO = await this.readPost(post.getPostId());
                return detailPost;
            })
            const detailPosts = await Promise.all(promise);
            return detailPosts;
        } catch (e) {
            throw e;
        }
    }

    private async readPinDetail(pins: Pin[]): Promise<PinDTO[]> {
        const promise = pins.map(async(pin: Pin) => {
            return pin.getPlaceId();
        })
        const placeIds:string[] = await Promise.all(promise);
        const places: PlaceDTO[] = await this.placeService.readPlaces(placeIds);
        const detailPromise = places.map(async(place: PlaceDTO) => {
            const placeId = place.placeId;
            const index = placeIds.findIndex((ele) => ele === placeId);
            const detailPin: PinDTO = new PinDTO(pins[index].getReview(), place);
            return detailPin;
        })
        const detailPins: PinDTO[] = await Promise.all(detailPromise);
        return detailPins;
    }

    async readUserPost(userId: number, page: number, num: number): Promise<PostDTO[]> {
        try {
            const posts: Post[] = await this.postRepository.findWithUserId(userId, page, num);
            const detailPost = await this.readPostList(posts);
            console.log(detailPost)
            return detailPost
        } catch (e) {
            throw e;
        }
    }

    async deletePost(userId: number, postId: number): Promise<void> {
        try {
            const post = await this.postRepository.findOne(postId, {relations: ['pins']});
            console.log(post)
            if (post.userId !== userId) throw new NotAcceptableException();
            await this.postRepository.softRemove(post);
        } catch (e) {
            throw e;
        }
    }

    async savePost(userId: number, postId: number): Promise<void> {
        try {
            const post = await this.postRepository.findOne(postId);
            const user = await this.userService.readUser(userId);
            const saved = new SavedPost(post, user);
            await this.savedPostRepository.save(saved);
        } catch (e) {
            throw e;
        }
    }

    async readSavedPost(userId: number, page: number, perPage: number): Promise<PostDTO[]> {
        try {
            const savedPostIds: number[] = await this.savedPostRepository.findWithUserId(userId, page, perPage);
            const posts: Post[] = await this.postRepository.findByIds(savedPostIds);
            return await this.readPostList(posts);
        } catch (e) {
            throw e;
        }
    }

    async readRegionPost(regionId: string, start: number, end: number, perPage: number) {
        try {
            const posts: Post[] = await this.postRepository.findWithRegionId(regionId, start, end, perPage);
            return await this.readPostList(posts);
        } catch (e) {
            throw e;
        }
    }

}
