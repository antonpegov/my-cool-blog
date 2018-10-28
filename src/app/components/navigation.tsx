import React from 'react';
import { RootState } from '../store/root-reducer';
import { connect } from 'react-redux';
import { categoriesSelectors, categoriesActions } from '../features/categories';
import { NavigationItem } from './navigation-item';
import Category from '../features/categories/models/category';
import Logo from './logo';
// import NavigationButtons from './navigation-buttons';
import { postsSelectors } from '../features/posts';
import { Post } from '../features/posts/models';
import { Link } from 'react-router-dom';
import Spinner from './spinner';

interface Props {
  activeCategoryId: number;
  activePost: Post|null;
  categories: Category[];
  selectCategory: (id: number|null) => void;
}

class Navigation extends React.Component<Props, {}> {
  render() {
    let postHeader;
    if (this.props.activePost !== null) {
      const category: Category =
        this.props.categories.find((item) => item.id === (this.props.activePost && this.props.activePost.categoryid))
        || {id: 0, name: 'Category not found!', color: 'red'};
      const imgStyle = {backgroundImage: `url(assets/posts/bg/${this.props.activePost.id}.jpg)`};
      const categoryStyle = {background: `red`};
      postHeader =
        // tslint:disable-next-line:jsx-wrap-multiline
        <div id="post-header" className="page-header">
          <div className="background-img" style={imgStyle} />
          <div className="container">
            <div className="row">
              <div className="col-md-10">
                <div className="post-meta">
                  <Link to={`/posts?cat=${this.props.activePost.categoryid}`} className="post-category" style={categoryStyle}>
                    {category.name}
                  </Link>
                  <span className="post-date">March 27, 2018</span>
                </div>
                <h1>{this.props.activePost.title}</h1>
              </div>
            </div>
          </div>
        </div>;
    }
    return !this.props.categories ? <Spinner /> : (
      <header id="header">
        <nav id="nav" className="navbar navbar-expand-lg navbar-light">
          <div id="nav-fixed" className="slide-down">
            <div className="container">
              <a className="navbar-brand" href="#">
                <Logo />
              </a>
              <button className="navbar-toggler border-0" type="button"
                  data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav-menu nav navbar-nav">
                  <NavigationItem
                    name="Home"
                    select={this.props.selectCategory}
                    selected={this.props.activeCategoryId === undefined}
                  />
                  {this.props.categories.filter(item => item.color).map(item => (
                    <NavigationItem
                      category={item}
                      name={item.name}
                      select={this.props.selectCategory}
                      selected={item.id === this.props.activeCategoryId}
                    />
                  ))}
                </ul>
              </div>
            {/* <NavigationButtons /> */}
            </div>
          </div>
        </nav>
        {postHeader}
      </header>
    );
  }
}

//#region Store Connection

const mapStateToProps = (state: RootState) => ({
  categories: categoriesSelectors.getCategories(state.categories),
  activeCategoryId: categoriesSelectors.getActiveCategory(state.categories),
  posts: postsSelectors.getPosts(state.posts),
  activePost: postsSelectors.getActivePost(state.posts),
});
const mapDispatchToProps = {
  selectCategory: (id: number|null) => categoriesActions.setActive(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

//#endregion
