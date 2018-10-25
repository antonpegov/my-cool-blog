import React from 'react';
import { RootState } from '../store/root-reducer';
import { connect } from 'react-redux';
import { categoriesSelectors, categoriesActions } from '../features/categories';
import { NavigationItem } from './navigation-item';
import Category from '../features/categories/models/category';

interface Props {
  selectCategory: (id: number) => void;
  categories: Category[];
  activeCategoryId: number;
}

export class Navigation extends React.Component<Props, {}> {

  render() { 
    return !this.props.categories ? 'loading..' : (
      <ul className="navigation-menu">
        {this.props.categories.map(item => (
          <NavigationItem
            category={item}
            select={this.props.selectCategory}
            selected={item.id === this.props.activeCategoryId}
          />
        ))}
      </ul>
    )
  }
}
//#region Store Connection

const mapStateToProps = (state: RootState) => ({
  categories: categoriesSelectors.getCategories(state.categories),
  activeCategoryId: categoriesSelectors.getActiveCategory(state.categories),
});
const mapDispatchToProps = {
  selectCategory: (id: number) => categoriesActions.setActive(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

//#endregion