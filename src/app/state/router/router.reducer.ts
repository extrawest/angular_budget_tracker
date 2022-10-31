import { Params } from '@angular/router';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Action } from '@ngrx/store';

export interface RouterStateUrl {
  data: { [key: string]: any };
  params: Params;
  queryParams: Params;
  url: string;
}

export type RouterState = RouterReducerState<RouterStateUrl>;

export const initialRouterState: RouterState = {
  navigationId: null,
  state: null,
};

export function reducer(state: RouterState = initialRouterState, action: Action): RouterState {
  return routerReducer(state, action);
}
