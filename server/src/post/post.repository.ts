import { User } from "src/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
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
}