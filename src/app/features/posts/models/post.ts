import { Comment } from './comment';

export interface Post {
  id: number;
  title: string;
  text: boolean;
  categoryid: number;
  comments: Comment[];
  commentsReady: boolean;
}
