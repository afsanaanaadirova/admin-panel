import { type PostDSO } from "@/data/dso/post.dso";
import { type PostModel } from "@/data/model/post.model";

export interface IPostRepository {
  getPosts(query: string): Promise<PostModel[]>;
  getPost(id: number): Promise<PostModel>;
  addPost(post: PostDSO): Promise<any>;
  deletePost(id: number): Promise<any>;
}
