import { Pin } from "../Components/MapView";
import { FeedType, PostType } from "../Shared/type";
import { DELETE, GET, POST, PUT } from "../utils/axios";

// 리스트 상세
export const getPost = async (postId: string) => {
  return (await GET(`api/post/${postId}`)) as PostType;
};

// 새 리스트 생성
interface PostBody {
  title: string;
  contents: string;
  regionId: string;
  share: boolean;
  pins: Pin[];
}
export const postPost = async (body: PostBody) => {
  return (await POST("api/post/", body)) as PostType;
};

// 리스트 수정
export const putPost = async (postId: string, body: PostBody) => {
  return await PUT(`api/post/${postId}`, body);
};

// 리스트 삭제
export const deletePost = async (postId: string) => {
  return await DELETE(`api/post/${postId}`);
};

// 피드 가져오기
interface GetFeedPostsParams {
  start?: string;
  end?: string;
  perPage?: number;
}
export const getFeedPosts = async (
  regionId: string,
  params: GetFeedPostsParams = {}
) => {
  return (await GET(`api/post/feed/${regionId}`, params)) as FeedType;
};

// 리스트 저장
export const postSavedPost = async (postId: string) => {
  return await POST(`api/post/savedPost/${postId}`);
};

// 리스트 저장 취소
export const deleteSavedPost = async (postId: string) => {
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
