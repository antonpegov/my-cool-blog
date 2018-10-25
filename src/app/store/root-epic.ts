import { combineEpics, ofType } from 'redux-observable';

import { fetchCategoriesFlow } from '../features/categories/epics';


// ----------------

import { map, tap } from 'rxjs/operators';
import { countersActions } from '../features/counters';

export const mySimpleEpic = (action$, state$) => action$.pipe(
  tap((action) => {
    // console.log(state$)
  }),
  ofType(countersActions.add),
  map(() => {
      debugger
      return countersActions.reset()
  })
)

//-----------------

export const rootEpic = combineEpics(
  fetchCategoriesFlow,
  mySimpleEpic
);