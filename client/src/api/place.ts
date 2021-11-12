import { PlaceType } from "../Shared/type";
import { GET } from "../utils/axios";

// 장소 검색
interface GetSearchParams {
  page?: number;
  perPage?: number;
  query: string;
}
export const getSearch = async (regionId: string, params: GetSearchParams) => {
  return (await GET(`api/place/search/${regionId}`, params)) as PlaceType[];
};

// 둘러보기
export const getAroundPlaces = async (regionId: string) => {
  return (await GET(`api/place/recommend/${regionId}`, {
    perPage: 30,
  })) as {
    places: PlaceType[];
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
};

// 내 모든 장소
export const getPlaceSaved = async () => {
  return (await GET("api/place/saved")) as PlaceType[];
};
