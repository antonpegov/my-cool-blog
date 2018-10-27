import { PostsState } from './';
import { Comment, Post } from './models';

export const getReadyStatus = (state: PostsState): boolean => state.ready;
export const getPosts = (state: PostsState): Post[]|undefined => state.list;
export const getPost = (state: PostsState, postId: number) => state.list[postId];
export const getComments = (state: PostsState, postId: number): Comment[]|undefined => {
  const post = state.list.find((item: Post) => item.id === postId);
  if (!post) {
    throw new Error('We can\'t requist comments when the post is not in the store.');
  }
  return post.comments;
};
