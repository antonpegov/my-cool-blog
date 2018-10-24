import { combineReducers } from 'redux';
import { getType, ActionType } from 'typesafe-actions';
import * as countersActions from './actions';

export type Action = ActionType<typeof countersActions>;
export type State = {
  readonly reduxCounter: number;
};
export const initialState: State = {
  reduxCounter: 0,
};

export default combineReducers<State, Action>({
  reduxCounter: (state = initialState.reduxCounter, action: Action) => {
    switch (action.type) {
      case getType(countersActions.add):
        return state + action.payload;
      case getType(countersActions.increment):
        return state + 1;
      case getType(countersActions.reset):
        return initialState.reduxCounter;
      default:
        return state;
    }
  },
});
