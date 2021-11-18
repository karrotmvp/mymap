import { GET } from "../utils/axios";
import { useQuery } from "react-query";

const getRegion = async (regionId: string) => {
  return (await GET(`api/region/${regionId}`)) as string;
};
export const useGetRegion = (regionId: string) =>
  useQuery(["useGetRegion"], () => getRegion(regionId));
