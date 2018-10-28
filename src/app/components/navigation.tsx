import React from 'react';
import { RootState } from '../store/root-reducer';
import { connect } from 'react-redux';
import { categoriesSelectors, categoriesActions } from '../features/categories';
import { NavigationItem } from './navigation-item';
import Category from '../features/categories/models/category';
import Logo from './logo';
import NavigationButtons from './navigation-buttons';

interface Props {
  selectCategory: (id: number|undefined) => void;
  categories: Category[];
  activeCategoryId: number;
}

class Navigation extends React.Component<Props, {}> {

  render() {
    return !this.props.categories ? 'loading..' : (
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
            <NavigationButtons />
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

//#region Store Connection

const mapStateToProps = (state: RootState) => ({
  categories: categoriesSelectors.getCategories(state.categories),
  activeCategoryId: categoriesSelectors.getActiveCategory(state.categories),
});
const mapDispatchToProps = {
  selectCategory: (id: number|undefined) => categoriesActions.setActive(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

//#endregion
