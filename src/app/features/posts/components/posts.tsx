import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { postsSelectors, postsActions} from '..';
import { Post } from '../models';
import PostPreview from './post-preview';
import * as config from '../../../../config';

//#region Interfaces Section
interface PostsProps {
  posts: Post[];
  ready: boolean;
  loadMore: any;
}
interface PostsState {}
//#endregion

class Posts extends React.Component<PostsProps, PostsState> {

  public render() {
    return !this.props.posts ? 'loading..' : (
      <React.Fragment>
       {this.props.posts.map(post => (
         <PostPreview post={post}/>
       ))}
       <div className="text-center">
        {
          this.props.ready
          ? <span className="btn btn-success" onClick={this.props.loadMore.bind(this, config.takePosts, this.lastPostId())}>
              Load more posts
            </span>
          : <span>loading...</span>
        }
        </div>
      </React.Fragment>
    );
  }

  private lastPostId() {
    return this.props.posts[this.props.posts.length - 1].id;
  }
}

//#region Store Connection
const mapStateToProps = (state: RootState) => ({
  posts: postsSelectors.getPosts(state.posts),
  ready: postsSelectors.getReadyStatus(state.posts),
});
const mapDispatchToProps = {
  loadMore: (amount, fromId) => {
    return postsActions.fetchPosts.request({amount, fromId});
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
//#endregion
