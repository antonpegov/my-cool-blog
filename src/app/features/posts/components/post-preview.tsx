import * as React from 'react';
import { Post } from '../models';

//#region Interfaces Section
interface PostPreviewProps {
  post: Post;
};
interface PostPreviewState {};
//#endregion

export class PostPreview extends React.Component<PostPreviewProps, PostPreviewState> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <h4>{this.props.post.title}</h4>
        <p>{this.props.post.text}</p>
      </React.Fragment>
    );
  }
}
