import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { postsSelectors, postsActions} from '..';
import { Post } from '../models';
import PostPreview from './post-preview';
import * as config from '../../../../config';
import { categoriesSelectors } from '../../categories';
import Category from '../../categories/models/category';
import Spinner from '../../../components/spinner';

//#region Interfaces Section
interface PostsProps {
  activePost: Post|null;
  activatePost: (post: Post|null) => void;
  categories: Category[];
  loadMore: any;
  posts: Post[];
  ready: boolean;
}
interface PostsState {}
//#endregion

class Posts extends React.Component<PostsProps, PostsState> {

  public render() {
    // remove active post from store
    if (this.props.activePost) {
      this.props.activatePost(null);
    }
    return !this.props.posts ? <Spinner /> : (
      <div className="section">
        <div className="container">
          <div className="row">
            {this.props.posts.map(post => (
              <div className="col-md-4">
                <PostPreview post={post} categories={this.props.categories}/>
              </div>
            ))}
          </div>
          <div className="text-center">
            {
              this.props.ready
              ? <span className="btn btn-success" onClick={this.props.loadMore.bind(this, config.takePosts, this.lastPostId())}>
                  Load more posts
                </span>
              : <Spinner />
            }
          </div>
        </div>
      </div>
    );
  }

  private lastPostId() {
    return this.props.posts[this.props.posts.length - 1].id;
  }
}

//#region Store Connection
const mapStateToProps = (state: RootState) => ({
  activePost: postsSelectors.getActivePost(state.posts),
  posts: postsSelectors.getPosts(state.posts),
  ready: postsSelectors.getReadyStatus(state.posts),
  categories: categoriesSelectors.getCategories(state.categories),
});
const mapDispatchToProps = {
  loadMore: (amount, fromId) => {
    return postsActions.fetchPosts.request({amount, fromId});
  },
  activatePost: (post: Post) => {
    return postsActions.selectPost(post);
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
//#endregion
