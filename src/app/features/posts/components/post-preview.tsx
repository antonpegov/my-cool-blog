import * as React from 'react';
import { Post } from '../models';
import { Link } from 'react-router-dom';
import Category from '../../categories/models/category';

//#region Interfaces Section
interface PostPreviewProps {
  post: Post;
  categories: Category[];
}
interface PostPreviewState {}
//#endregion

class PostPreview extends React.Component<PostPreviewProps, PostPreviewState> {
  public render(): JSX.Element {
    const category: Category =
      this.props.categories.find((item) => item.id === this.props.post.categoryid)
      || {id: 0, name: 'Category not found!', color: 'red'};
    return (
      <div className="post">
        <Link to={`/posts/${this.props.post.id}`} className="post-img">
          <img src={`assets/posts/bg/${this.props.post.id}.jpg`} alt="" className="src"/>
        </Link>
        <div className="post-body">
          <div className="post-meta">
            <Link to={`/posts?cat=${this.props.post.categoryid}`} className="post-category" style={{background: category.color}}>
              {category.name}
            </Link>
          </div>
          <Link to={`/posts/${this.props.post.id}`} className="post-title">{this.props.post.title}</Link>
          <p className="post-text">{this.props.post.text}</p>
        </div>
      </div>
    );
  }
}

export default PostPreview;
