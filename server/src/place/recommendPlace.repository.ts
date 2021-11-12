import { EntityRepository, Raw, Repository } from "typeorm";
import { RecommendPlace } from "./entities/recommendPlace.entity";

@EntityRepository(RecommendPlace)
export class RecommendPlaceRepository extends Repository<RecommendPlace> {
    async findWithRegionId(regionId: string[], seed: number, perPage: number, page: number) {
        const places = await this.query('SELECT placeId FROM recommend_place WHERE regionId IN (?) ORDER BY RAND(?) LIMIT ? OFFSET ?', [regionId, seed, Number(perPage), perPage * page])
        return places.map(place => place.placeId)
    }

    async findWithoutRegionId(perPage: number, page: number) {
        const places = await this.find({
            take: perPage,
            skip: perPage * page,
            order: { createdAt: 'DESC' }
        })
        return places.map(place => place.getPlaceId())
    }
}