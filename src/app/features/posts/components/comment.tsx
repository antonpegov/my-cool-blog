import * as React from 'react';
import { Comment } from '../models';
interface CommentProps {
  comment: Comment;
}

interface CommentState {}

class CommentCmp extends React.Component<CommentProps, CommentState> {
  public render(): JSX.Element {
    return (
      <article className="post">
        <header>{this.props.comment.author || 'Guest'}</header>
        <section className="comment-body">{this.props.comment.body}</section>
      </article>
    );
  }
}

export default CommentCmp;
