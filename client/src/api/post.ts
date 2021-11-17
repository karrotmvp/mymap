import { Pin } from "../Components/MapView";
import { FeedType, PostType } from "../Shared/type";
import { DELETE, GET, POST, PUT } from "../utils/axios";
import { useQuery } from "react-query";

// 리스트 상세
const getPost = async (postId: number) => {
  return (await GET(`api/post/${postId}`)) as PostType;
};
export const useGetPost = (postId: number) =>
  useQuery(["useGetPost", postId], () => getPost(postId));

// 새 리스트 생성
interface PostBody {
  title: string;
  contents?: string;
  regionId: string;
  share: boolean;
  pins: Pin[];
}
export const postPost = async (body: PostBody) => {
  return (await POST("api/post/", body)) as PostType;
};

// 리스트 수정
export const putPost = async (postId: number, body: PostBody) => {
  return (await PUT(`api/post/${postId}`, body)) as number;
};

// 리스트 삭제
export const deletePost = async (postId: number) => {
  return await DELETE(`api/post/${postId}`);
};

// 피드 가져오기
interface GetFeedPostsParams {
  start?: number;
  end?: number;
  perPage?: number;
}
const getFeedPosts = async (
  regionId: string,
  params: GetFeedPostsParams = {}
) => {
  console.log("api", params);
  return (await GET(`api/post/feed/${regionId}`, params)) as FeedType;
};
export const useGetFeedPosts = (
  regionId: string,
  params: GetFeedPostsParams = {}
) => useQuery(["useGetFeedPosts"], () => getFeedPosts(regionId, params));

// 리스트 저장
export const postSavedPost = async (postId: number) => {
  return await POST(`api/post/savedPost/${postId}`);
};

// 리스트 저장 취소
export const deleteSavedPost = async (postId: number) => {
  return await DELETE(`api/post/savedPost/${postId}`);
};

// 저장한 리스트 가져오기
interface PaginationParams {
  page?: number;
  perPage?: number;
}
const getSavedPosts = async (params: PaginationParams = {}) => {
  return (await GET("api/post/savedPost", params)) as FeedType;
};
export const useGetSavedPosts = (params: PaginationParams = {}) =>
  useQuery(["useGetSavedPosts"], () => getSavedPosts(params));

// 내가 쓴 리스트
const getMyPosts = async (params: PaginationParams = {}) => {
  return (await GET("api/post/mypost", params)) as FeedType;
};
export const useGetMyPosts = (params: PaginationParams = {}) =>
  useQuery(["useGetMyPosts"], () => getMyPosts(params));

// 내가 쓴 리스트 전체
const getMyAllPosts = async (regionId: string) => {
  return (await GET("api/post/mypost/info", { regionId })) as PostType[];
};
export const useGetMyAllPosts = (regionId: string) =>
  useQuery(["useGetMyAllPosts"], () => getMyAllPosts(regionId));

// 장소 저장
export const putPostPin = async (
  params: {
    postId: number[];
    regionId: string;
  },
  body: {
    review?: string;
    placeId: string;
  }
) => {
  return await PUT("api/post/pin", body, params);
};
