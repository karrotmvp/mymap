import { PlaceType } from "../Shared/type";
import { GET, POST } from "../utils/axios";
import { useQuery } from "react-query";

// 저장한 장소 가져오기
const getSavedPlaces = async () => {
  return (await GET("api/savedPlaces")) as PlaceType[];
};
export const useGetSavedPlaces = () =>
  useQuery(["useGetPlaceSaved"], () => getSavedPlaces());

// 장소 저장
export const postSavedPlaces = async (params: { placeId: string[] }) => {
  await POST("api/savedPlaces", {}, params);
};
