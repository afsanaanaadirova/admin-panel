import { IPostRepository } from "../abstraction/i_post_repository";
import { type PostModel } from "@/data/model/post.model";
import { type PostDSO } from "@/data/dso/post.dso";
import {
  getPostService,
  getPostsService,
  addPostService,
  deletePostService
} from "@/app/services/posts.service";

class PostRepository implements IPostRepository {
  deletePost(id: number): Promise<unknown> {
   return deletePostService(id)
  }
  addPost(post: PostDSO): Promise<unknown> {
    return addPostService(post);
  }
  getPosts(query: string): Promise<PostModel[]> {
    return getPostsService(query);
  }
  getPost(id: number): Promise<PostModel> {
    return getPostService(id);
  }
}

export default new PostRepository();
