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
            skip: perPage * page,
            take: perPage,
        });
        const postIds: number[] = [];
        savedPost.map((post: SavedPost) => {
            postIds.push(post.getPostId());
        })
        return postIds;
    }
}