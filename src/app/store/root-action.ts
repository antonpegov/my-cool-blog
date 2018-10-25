import { RouterAction, LocationChangeAction } from 'connected-react-router';
import { CountersAction } from '../features/counters';
import { CategoriesAction } from '../features/categories';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | CategoriesAction
  | CountersAction
  | ReactRouterAction;
