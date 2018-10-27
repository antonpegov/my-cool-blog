import { combineReducers, Reducer } from 'redux';
import { categoriesReducer } from '../features/categories';
import { RootAction } from './root-action';
import { StateType } from 'typesafe-actions';
import { postsReducer } from '../features/posts';

export const rootReducer: Reducer = combineReducers<RootState, RootAction>({
  categories: categoriesReducer,
  posts: postsReducer,
});

export type RootState = StateType<typeof rootReducer>;
