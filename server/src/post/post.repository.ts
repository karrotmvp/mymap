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

    async updatePost(postId: number, post: UpdatePostDTO, pins: Pin[]) {
        const existPost = await this.findOne(postId, { relations : ['pins'] });
        existPost.updatePost(post, pins);
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

    async findWithRegionId(regionId: string[], start: number, end: number, perPage: number) {
        const posts = await this.find({
            order: { createdAt: 'DESC' },
            where: (qb) => {
                qb.where('regionId IN (:...regionId) AND (postId < :end OR postId > :start) AND share = true', { regionId: regionId, start: start, end: end})
            },
            take: perPage,
        })
        return posts;
    }
}