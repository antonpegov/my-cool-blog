// epics.ts
import { fetchCategiries } from './actions';
import { Epic } from 'redux-observable';
import { RootAction } from 'src/app/store/root-action';
import { RootState } from 'src/app/store/root-reducer';
import { of, pipe, from } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { categoryApi } from '../../../api';

export const fetchCategoriesFlow: Epic<RootAction, any, RootState> = (action$, state) => {
  debugger;
  return action$.pipe(
    filter(isActionOf(fetchCategiries.request)),
    switchMap(action =>
      from(categoryApi.getAll()).pipe(
        map(fetchCategiries.success),
        catchError(pipe(fetchCategiries.failure, of))
      )
    )
  )
}
