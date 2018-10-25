import { createAction, createAsyncAction } from 'typesafe-actions';
import Category from './models/category';

const
  // FETCH_START = 'categiries/FETCH_START',
  // FETCH_SUCCESS = 'categiries/FETCH_SUCCESS',
  // FETCH_FAILURE = 'categiries/FETCH_FAILURE',
  SET_ACTIVE = 'categiries/SET_ACTIVE';


// export const fetch = createAction(FETCH_START);
// export const fetchFailure = createAction(FETCH_FAILURE);
// export const fetchSuccess = createAction(FETCH_SUCCESS, resolve => {
//   return (list: Category[]) => resolve(list);
// });

export const setActive = createAction(SET_ACTIVE, resolve => {
  return (id: number) => resolve(id);
});

export const fetchCategiries = createAsyncAction(
  'FETCH_CATEGORIES_REQUEST',
  'FETCH_CATEGORIES_SUCCESS',
  'FETCH_CATEGORIES_FAILURE'
)<void, {data: Category[]} , Error>();
