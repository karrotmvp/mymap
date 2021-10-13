import { User } from "src/user/entities/user.entity";
import { EntityRepository, LessThan, MoreThan, Repository } from "typeorm";
import { CreatePostDTO } from "./dto/create-post.dto";
import { Pin } from "./entities/pin.entity";
import { Post } from "./entities/post.entity";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    async savePost(post: CreatePostDTO, user: User, pins: Pin[]) {
        const newPost = new Post(user, post.title, post.regionId, post.share, pins);
        await this.save(newPost);
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
            skip: num * page,
            take: num,
        });
        return posts;
    }

    async findWithRegionId(regionId: string, start: number, end: number, perPage: number) {
        const posts = await this.find({
            order: { createdAt: 'DESC' },
            where: (qb) => {
                qb.where('regionId = :regionId AND postId NOT IN (:end, :start)', { regionId: regionId, start: start, end: end})
            },
            take: perPage,
        })
        return posts;
    }
}