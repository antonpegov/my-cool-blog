import { createAction } from 'typesafe-actions';

const
  ADD = 'counters/ADD',
  INCREMENT = 'counters/INCREMENT',
  RESET = 'counters/RESET';

export const add = createAction(ADD, resolve => {
  return (amount: number) => resolve(amount);
});
export const increment = createAction(INCREMENT);
export const reset = createAction(RESET);
