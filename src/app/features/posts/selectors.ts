import { PostsState } from './';

export const getReadyStatus = (state: PostsState) => state.ready;
export const getPosts = (state: PostsState) => state.list;
export const getComments = (state: PostsState, postId: number) => state.list[postId].comments;
