import { PlaceDetailType, PlaceType } from "../Shared/type";
import { GET, POST } from "../utils/axios";
import { useQuery } from "react-query";

// 장소 검색
interface GetSearchParams {
  page?: number;
  perPage?: number;
  query: string;
}
const getSearch = async (regionId: string, params: GetSearchParams) => {
  return (await GET(`api/place/search/${regionId}`, params)) as PlaceType[];
};
export const useGetSearch = (regionId: string, params: GetSearchParams) =>
  useQuery(["useGetSearch"], () => getSearch(regionId, params));

// 둘러보기
const getAroundPlaces = async (regionId: string) => {
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
export const useGetAroundPlaces = (regionId: string, option?: any) =>
  useQuery(["useGetAroundPlaces"], () => getAroundPlaces(regionId), option);

// 내 모든 장소
const getPlaceSaved = async () => {
  return (await GET("api/place/saved")) as PlaceType[];
};
export const useGetPlaceSaved = () =>
  useQuery(["useGetPlaceSaved"], () => getPlaceSaved());

// 장소 제안
export const postPlaceNew = async (regionId: string, placeName: string) => {
  await POST(`api/place/new/${regionId}`, { placeName });
};

// 장소 상세
const getPlaceDetail = async (placeId: string) => {
  console.log(placeId);
  return (await GET(`api/place/detail/${placeId}`)) as PlaceDetailType;
};
export const useGetPlaceDetail = (placeId: string) =>
  useQuery(["useGetPlaceDetail"], () => getPlaceDetail(placeId));
