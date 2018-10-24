import { RouterAction, LocationChangeAction } from 'connected-react-router';
import { CountersAction } from '../features/counters';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | CountersAction
  | ReactRouterAction;
