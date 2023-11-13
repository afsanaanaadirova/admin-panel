import { type PostDSO } from "@/data/dso/post.dso";
import { type PostModel } from "@/data/model/post.model";

export type PostSliceType = {
    posts: PostModel[];
    post_form: PostDSO;
    is_edit: boolean;
}