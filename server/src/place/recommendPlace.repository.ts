import { EntityRepository, Raw, Repository } from "typeorm";
import { RecommendPlace } from "./entities/recommendPlace.entity";

@EntityRepository(RecommendPlace)
export class RecommendPlaceRepository extends Repository<RecommendPlace> {
    async findWithRegionId(regionId: string[], seed: number, perPage: number, page: number) {
        const higherPlaces = await this.query('SELECT placeId FROM recommend_place WHERE priority = 1 AND regionId IN (?) ORDER BY RAND(?) LIMIT ? OFFSET ?', [regionId, seed, Math.floor(perPage * 2/3), (Math.floor(perPage * 2/3) * page)])
        const lowerPlaces = await this.query('SELECT placeId FROM recommend_place WHERE priority = 0 AND regionId IN (?) ORDER BY RAND(?) LIMIT ? OFFSET ?', [regionId, seed, Math.floor(perPage/3), (Math.floor(perPage/3) * page)])
        const places = [...higherPlaces, ...lowerPlaces];
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