import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type PostDSO } from "@/data/dso/post.dso";
import { deepClone } from "@/app/utils/deepClone";
import { type PostModel } from "@/data/model/post.model";
import { type PostSliceType } from "./postSlice";

const initPostForm: PostDSO = {
  title: "",
  description: "",
  //@ts-ignore
  isRead: false
}

const initialState: PostSliceType = {
  posts: [],
  post_form: deepClone(initPostForm),
  is_edit: false
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostModel[]>) => {
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<PostModel>) => {
      state.posts.unshift(action.payload)
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
    setPostForm: (state, action: PayloadAction<PostModel>) => {
      let key: keyof PostDSO
      for (key in state.post_form) {
        //@ts-ignore
        (state.post_form[key] as PostDSO[keyof PostDSO]) = action.payload[key]
      }
      state.post_form.id = action.payload.id
    },
    setAllPostFormInputs: (
      state,
      action: PayloadAction<{ key: keyof PostDSO, value: PostDSO[keyof PostDSO] }>
    ) => {
      const { key, value } = action.payload;
      (state.post_form[key] as PostDSO[keyof PostDSO]) = value
    },
    resetPostForm: (state) => {
      state.post_form = initPostForm
    },
  },
});

export const { setPosts, addPost, deletePost, setPostForm, setAllPostFormInputs, resetPostForm } = postSlice.actions;
export default postSlice.reducer;
