import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'src/app/store/root-reducer';
import { postsSelectors, postsActions } from '..';
import * as config from '../../../../config';
import { connect } from 'react-redux';
import { Comment, Post } from '../models';
import { Comment as CommentCmp } from '../components';

interface PostProps {
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

  public render(): JSX.Element {
    // every time store uptates, render function rerenders its component
    // and here we can check for our post in the store and fetch more posts if needed
    this.post = this.props.posts ? this.props.posts.find((item) => item.id === this.postId) : undefined;
    if (this.post) {
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

    return !this.post ? <span className="loading">'Loading...'</span> : (
      <article className="post">
        <header>{this.post.title}</header>
        <section className="post-body">{this.post.text}</section>
        <section className="post-comments">
          {this.post.comments && this.post.comments.length > 0
            ? this.post.comments.map((comment: Comment) => <CommentCmp key={comment.id} comment={comment}/>)
            : <span>no comments</span>
          }
        </section>
        <div className="text-center">
        {
          this.post.commentsReady /*&& !this.requestingComments*/
          ? <span className="btn btn-success"
                onClick={this.props.loadComments.bind(this, config.takeComments, this.postId, this.lastCommentId())}>
              Load more comments
            </span>
          : <span>loading...</span>
        }
        </div>
      </article>
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
};
export default connect(mapStateToProps, mapDispatchToProps)(PostCmp);

//#endregion
