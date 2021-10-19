import { Pin } from "../Components/MapView";
import { PostType } from "../Shared/type";
import { DELETE, GET, POST, PUT } from "../utils/axios";

// 리스트 상세
export const getPost = async (postId: number) => {
  return (await GET(`api/post/${postId}`)) as PostType;
};

// 새 리스트 생성
interface PostPostBody {
  title: string;
  contents: string;
  regionId: string;
  share: boolean;
  pins: Pin[];
}
export const postPost = async (body: PostPostBody) => {
  return (await POST("api/post/", body)) as PostType;
};

// 리스트 수정
interface PutPostBody extends PostPostBody {
  latitude: number;
  longitude: number;
}
export const putPost = async (postId: number, body: PutPostBody) => {
  return await PUT(`api/post/${postId}`, body);
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
  regionId: number,
  params: GetFeedPostsParams = {}
) => {
  return await GET(`api/post/feed/${regionId}`, params);
};

// 리스트 저장
export const postSavedPost = async (postId: number) => {
  return await POST(`api/post/savedPost/${postId}`);
};

// 저장한 리스트 가져오기
interface PaginationParams {
  page?: number;
  perPage?: number;
}
export const getSavedPosts = async (params: PaginationParams = {}) => {
  return await GET("api/post/savedPost", params);
};

// 내가 쓴 리스트
export const getMyPost = async (params: PaginationParams = {}) => {
  return await GET("api/post/mypost", params);
};
