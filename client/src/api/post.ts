import { Pin } from "../Components/MapView";
import { FeedType, PostType } from "../Shared/type";
import { DELETE, GET, POST, PUT } from "../utils/axios";

// 리스트 상세
export const getPost = async (postId: number) => {
  return (await GET(`api/post/${postId}`)) as PostType;
};

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
export const getFeedPosts = async (
  regionId: string,
  params: GetFeedPostsParams = {}
) => {
  return (await GET(`api/post/feed/${regionId}`, params)) as FeedType;
};

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
export const getSavedPosts = async (params: PaginationParams = {}) => {
  return (await GET("api/post/savedPost", params)) as FeedType;
};

// 내가 쓴 리스트
export const getMyPosts = async (params: PaginationParams = {}) => {
  return (await GET("api/post/mypost", params)) as FeedType;
};

// 내가 쓴 리스트 제목만
export const getMyPostNames = async () => {
  return (await GET("api/post/mypost")) as FeedType;
};

// 장소 저장
export const putPostPin = async (
  params: {
    postId: number[];
  },
  body: {
    review?: string;
    placeId: string;
  }
) => {
  return await PUT("api/post/pin", body, params);
};
