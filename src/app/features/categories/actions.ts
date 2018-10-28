import { createAction, createAsyncAction } from 'typesafe-actions';
import Category from './models/category';

export const setActive = createAction('categiries/SET_ACTIVE', resolve => {
  return (id: number|null) => resolve(id);
});

export const fetchCategiries = createAsyncAction(
  'categiries/FETCH_CATEGORIES_REQUEST',
  'categiries/FETCH_CATEGORIES_SUCCESS',
  'categiries/FETCH_CATEGORIES_FAILURE'
)<void, {data: Category[]} , Error>();
