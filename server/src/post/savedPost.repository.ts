import { EntityRepository, Repository } from "typeorm";
import { SavedPost } from "./entities/savedPost.entity";

@EntityRepository(SavedPost)
export class SavedPostRepository extends Repository<SavedPost> {
    async findWithUserId(userId: number, page: number, perPage:number): Promise<number[]> {
        const savedPost = await this.find({
            relations: ['user'],
            where: (qb) => {
                qb.where('SavedPost__user.userId = :userId', { userId: userId })
            },
            order: { createdAt: 'DESC' },
            skip: perPage * (page - 1),
            take: perPage,
        });
        const postIds: number[] =savedPost.map((post: SavedPost) => {
            return post.getPostId();
        })
        return postIds;
    }

    async findWithPostId(userId: number, postId: number): Promise<SavedPost> {
        const savedPost = await this.findOne({
            relations: ['user', 'post'],
            where: (qb) => {
                qb.where('SavedPost__user.userId = :userId AND SavedPost__post.postId = :postId', { userId: userId, postId: postId })
            }
        })
        return savedPost;
    }
}