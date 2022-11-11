import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { RouterState } from './router';

export interface State {
  router: RouterState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};
