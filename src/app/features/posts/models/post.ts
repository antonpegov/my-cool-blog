import { Comment } from './comment';

export interface Post {
  id: number;
  title: string;
  text: boolean;
  comments: Comment[];
  commentsReady: boolean;
}
