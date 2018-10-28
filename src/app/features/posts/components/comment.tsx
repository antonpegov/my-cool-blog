import * as React from 'react';
import { Comment } from '../models';
interface CommentProps {
  comment: Comment;
}

interface CommentState {}

class CommentCmp extends React.Component<CommentProps, CommentState> {
  public render(): JSX.Element {
    return (
      <div className="media">
        <div className="media-left">
          <img className="media-object" src="assets/posts/img/avatar.png" alt="" />
        </div>
        <div className="media-body">
          <div className="media-heading">
            <h4>{this.props.comment.author || 'Guest'}</h4>
            <span className="time">March 27, 2018 at 8:00 am</span>
            <a className="reply">Reply</a>
          </div>
          <p>{this.props.comment.body}</p>
        </div>
      </div>
    );
  }
}

export default CommentCmp;
