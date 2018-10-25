import { RouterAction, LocationChangeAction } from 'connected-react-router';
import { CategoriesAction } from '../features/categories';
import { PostsAction } from '../features/posts';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | CategoriesAction
  | PostsAction
  | ReactRouterAction;
