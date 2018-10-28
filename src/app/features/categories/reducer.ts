import { combineReducers } from 'redux';
import { getType, ActionType } from 'typesafe-actions';
import * as categoriesActions from './actions';
import Category from './models/category';

export type Action = ActionType<typeof categoriesActions>;
export type State = {
  readonly activeId: number|null;
  readonly list: Category[];
  readonly ready: boolean;
};
export const initialState: State = {
  activeId: null,
  list: [],
  ready: false,
};

export default combineReducers<State, Action>({
  activeId: (state = initialState.activeId, action: Action) => {
    switch (action.type) {
      case getType(categoriesActions.setActive):
        return action.payload;
      default:
        return state;
    }
  },
  list: (state = initialState.list, action: Action) => {
    switch (action.type) {
      case getType(categoriesActions.fetchCategiries.success):
        return action.payload.data;
      // case getType(categoriesActions.fetchCategiries.request):
      //   debugger;
      //   return [];
      default:
        return state;
    }
  },
  ready: (state = initialState.ready, action: Action) => {
    switch (action.type) {
      case getType(categoriesActions.fetchCategiries.success):
        return true;
      default:
        return state;
    }
  }
});
