import { createAsyncAction } from 'typesafe-actions';
import { Post, Comment } from './models';

export const fetchPosts = createAsyncAction(
  'posts/FETCH_POSTS_REQUEST',
  'posts/FETCH_POSTS_SUCCESS',
  'posts/FETCH_POSTS_FAILURE'
)<{amount: number|undefined; fromId?: number; toId?: number}, {data: Post[]}, Error>();

export const fetchComments = createAsyncAction(
  'posts/FETCH_COMMENTS_REQUEST',
  'posts/FETCH_COMMENTS_SUCCESS',
  'posts/FETCH_COMMENTS_FAILURE'
)<{amount: number|undefined; forId: number; fromId?: number}, {data: {comments: Comment[]; postid: number}}, Error>();
