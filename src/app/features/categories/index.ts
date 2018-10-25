import * as categoriesActions from './actions';
import * as categoriesSelectors from './selectors';
import categoriesReducer, { State as CategoriesState, Action as CategoriesAction } from './reducer';
// export * from './epics';

export {
  categoriesReducer,
  categoriesActions,
  categoriesSelectors,
  CategoriesState,
  CategoriesAction,
};