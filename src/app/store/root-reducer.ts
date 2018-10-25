import { combineReducers, Reducer } from 'redux';
import { countersReducer } from '../features/counters';
import { categoriesReducer } from '../features/categories';
import { RootAction } from './root-action';
import { StateType } from 'typesafe-actions';

export const rootReducer: Reducer = combineReducers<RootState, RootAction>({
  counters: countersReducer,
  categories: categoriesReducer
});

export type RootState = StateType<typeof rootReducer>;
