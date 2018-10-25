import { createAction, createAsyncAction } from 'typesafe-actions';
import Category from './models/category';

const
  SET_ACTIVE = 'categiries/SET_ACTIVE';

export const setActive = createAction(SET_ACTIVE, resolve => {
  return (id: number) => resolve(id);
});

export const fetchCategiries = createAsyncAction(
  'categiries/FETCH_CATEGORIES_REQUEST',
  'categiries/FETCH_CATEGORIES_SUCCESS',
  'categiries/FETCH_CATEGORIES_FAILURE'
)<void, {data: Category[]} , Error>();
