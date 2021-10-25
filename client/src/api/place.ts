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
interface GetAroundPlaceParams {
  page?: number;
  perPage?: number;
  paginator?: string;
}
interface GetAroundPlacesResponse {
  places: PlaceType[];
  paginator: string;
}
export const getAroundPlaces = async (
  regionId: string,
  params: GetAroundPlaceParams
) => {
  return (await GET(
    `api/place/region/${regionId}`,
    params
  )) as GetAroundPlacesResponse;
};
