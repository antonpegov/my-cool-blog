import * as React from 'react';
import { Post } from '../models';
import { Link } from 'react-router-dom';

//#region Interfaces Section
interface PostPreviewProps {
  post: Post;
};
interface PostPreviewState {};
//#endregion

class PostPreview extends React.Component<PostPreviewProps, PostPreviewState> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Link to={`/posts/${this.props.post.id}`}>{this.props.post.title}</Link>
        <p>{this.props.post.text}</p>
      </React.Fragment>
    );
  }
}

export default PostPreview;
