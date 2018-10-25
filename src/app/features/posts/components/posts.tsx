import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { postsSelectors/*, postsActions*/ } from '..';
import { Post } from '../models';
import { PostPreview } from './post-preview';

//#region Interfaces Section
interface PostsProps {
  posts: Post[];
}
interface PostsState {};
//#endregion

export class Posts extends React.Component<PostsProps, PostsState> {
  public render() {
    return !this.props.posts ? 'loading..' : (
      <React.Fragment>
       {this.props.posts.map(post => (
         <PostPreview post={post}/>
       ))}
      </React.Fragment>
    );
  }
}

//#region Store Connection
const mapStateToProps = (state: RootState) => ({
  posts: postsSelectors.getPosts(state.posts),
});
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
//#endregion
