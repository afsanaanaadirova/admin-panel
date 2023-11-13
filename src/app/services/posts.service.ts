import axiosInstance from "@/app/lib/axios.config";
import { type PostDSO } from "@/data/dso/post.dso";
import { type PostDTO } from "@/data/dto/post.dto";
import { postMigration } from "@/data/migration/post.migration";
import { endpoints } from "@/data/utils/endpoints";

export const getPostsService = async (query: string) => {
  const res = await axiosInstance.get<PostDTO[]>(endpoints.posts(query));
  return res.data.map(postMigration);
};

export const getPostService = async (id: number) => {
  const res = await axiosInstance.get<PostDTO>(endpoints.post(id));
  return postMigration(res.data);
};

export const addPostService = async (post: PostDSO) => {
  const res = await axiosInstance.post(endpoints.posts(), post);
  return res.data;
};

export const deletePostService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.post(id));
  return res.data;
};
