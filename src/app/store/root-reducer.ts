import { combineReducers, Reducer } from 'redux';
import { countersReducer } from '../features/counters';
import { RootAction } from './root-action';
import { StateType } from 'typesafe-actions';

export const rootReducer: Reducer = combineReducers<RootState, RootAction>({
  counters: countersReducer,
});

export type RootState = StateType<typeof rootReducer>;
