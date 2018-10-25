import { combineEpics } from 'redux-observable';

import { fetchCategoriesFlow } from '../features/categories/epics';
import { fetchPostsFlow, fetchCommentsFlow } from '../features/posts/epics';

export const rootEpic = combineEpics(
  fetchCategoriesFlow,
  fetchPostsFlow,
  fetchCommentsFlow,
);