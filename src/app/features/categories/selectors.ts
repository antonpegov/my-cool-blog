import { CategoriesState } from './';

export const getReadyStatus = (state: CategoriesState) => state.ready;
export const getActiveCategory = (state: CategoriesState) => state.activeId;
export const getCategories = (state: CategoriesState) => state.list;
