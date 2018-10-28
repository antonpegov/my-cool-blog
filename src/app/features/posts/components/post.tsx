import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'src/app/store/root-reducer';
import { postsSelectors, postsActions } from '..';
import * as config from '../../../../config';
import { connect } from 'react-redux';
import { Comment, Post } from '../models';
import { Comment as CommentCmp } from '../components';
import Spinner from '../../../components/spinner';

interface PostProps {
  activatePost: (post: Post) => void;
  activePost: Post|null;
  postsReady: boolean;
  posts: Post[];
  loadComments: (amount: number|undefined, forId: number, fromId?: number) => void;
  loadPosts: (amount: number|undefined, fromId?: number, toId?: number) => void;
}

interface PostState {
}

class PostCmp extends React.Component<PostProps & RouteComponentProps, PostState> {

  private postId = +(this.props.match.params as any).id;  // id recieved from URL
  private post: Post|undefined = undefined;               // copy of post taken from store

  public componentDidMount() {
    window.scrollTo(70, 70);
  }

  public render(): JSX.Element {
    this.post = this.props.posts ? this.props.posts.find((item) => item.id === this.postId) : undefined;
    if (this.post) {
      // update active post in store
      if (!this.props.activePost || this.props.activePost.id !== this.post.id) {
        this.props.activatePost(this.post);
      }
      // when our post is just loaded, it has no comments, so initializing first request here if its already not in progress
      if (!this.post.comments && this.post.commentsReady === undefined) {
        this.props.loadComments(config.takeComments, this.post.id);
      }
    } else {
      // if our post not present in the storage, we first requesting it with all top-lewel ones
      if (this.props.postsReady) {
        this.props.loadPosts(undefined, this.lastPostId(), this.postId);
      }
    }

    return !this.post ? <Spinner /> : (
      <div className="section">
        <div className="container">
          <div className="main-post mb-4">
            {this.post.text}
          </div>
          <div className="section-row">
            <div className="section-title">
              <h2>Comments</h2>
            </div>
            <div className="post-comments">
              {this.post.comments && this.post.comments.length > 0
                ? this.post.comments.map((comment: Comment) => <CommentCmp key={comment.id} comment={comment}/>)
                : <span>;)</span>
              }
            </div>
          </div>
        </div>
        <div className="text-center">
        {
          this.post.commentsReady
          ? <span className="btn btn-success"
                onClick={this.props.loadComments.bind(this, config.takeComments, this.postId, this.lastCommentId())}>
              Load more comments
            </span>
          : <Spinner />
        }
        </div>
      </div>
    );
  }

  private lastCommentId() {
    if (!this.post || !this.post.comments) {
      throw new Error('This method shodn\'t be called before initialisation of post component');
    }
    return this.post.comments[this.post.comments.length - 1].id;
  }

  private lastPostId() {
    return this.props.posts[this.props.posts.length - 1].id;
  }
}

//#region Store Connection

const mapStateToProps = (state: RootState) => ({
  activePost: postsSelectors.getActivePost(state.posts),
  postsReady: postsSelectors.getReadyStatus(state.posts),
  posts: postsSelectors.getPosts(state.posts),
});
const mapDispatchToProps = {
  loadComments: (amount: number|undefined, forId: number, fromId?: number) => {
    return postsActions.fetchComments.request({amount, forId, fromId});
  },
  loadPosts: (amount: number|undefined, fromId: number, toId) => {
    return postsActions.fetchPosts.request({amount, fromId, toId});
  },
  activatePost: (post: Post) => {
    return postsActions.selectPost(post);
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(PostCmp);

//#endregion
