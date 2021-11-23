import { filter } from "rxjs";
import { User } from "src/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePostDTO } from "./dto/create-post.dto";
import { UpdatePostDTO } from "./dto/update-post.dto";
import { Pin } from "./entities/pin.entity";
import { Post } from "./entities/post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    async savePost(post: CreatePostDTO, regionName: string, user: User, pins: Pin[]) {
        const newPost = new Post(user, post.title, post.contents, post.regionId, regionName, post.share, pins);
        return await this.save(newPost);
    }

    async updatePost(postId: number, post: UpdatePostDTO, pins: Pin[], regionName?: string) {
        const existPost = await this.findOne(postId, { relations : ['pins'] });
        existPost.updatePost(post, pins, regionName);
        await this.save(existPost);
        return postId;
    }

    async findWithPostId(postId: number) {
        return await this.findOne(postId, { relations: ['pins', 'user'] })
    }

    async findWithUserId(userId: number, page: number, num: number) {
        const posts = await this.find({
            relations: ['user'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId', { userId: userId });
            },
            order: { createdAt: 'DESC' },
            skip: num * (page - 1),
            take: num,
        });
        return posts;
    }

    async findWithUserIdAndRegionId(userId: number, regionIds: string[]): Promise<Post[]> {
        const posts: Post[] = await this.find({
            relations: ['user', 'pins'],
            where: (qb) => {
                qb.where('Post__user.userId = :userId AND (regionId IN (:...regionId) OR regionId IS NULL)', { userId: userId, regionId: regionIds });
            },
            order: { createdAt: 'DESC' }
        })
        return posts;
    }

    async findWithRegionId(regionId: string[], start: number, end: number, perPage: number) {
        const posts = await this.find({
            relations: ['user', 'pins'],
            order: { createdAt: 'DESC' },
            where: (qb) => {
                // qb.where('regionId IN (:...regionId) AND (postId < :end OR postId > :start) AND (share = true OR (share = false AND Post__user.userId = :userId))', { regionId: regionId, start: start, end: end, userId: userId})
                qb.where('regionId IN (:...regionId) AND (postId < :end OR postId > :start) AND share = true', { regionId: regionId, start: start, end: end })
                
            },
            take: perPage,
        })
        return posts.filter(post => post.pins.length !== 0);
    }


}