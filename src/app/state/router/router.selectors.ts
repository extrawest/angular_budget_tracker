import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { RouterState } from './router.reducer';

export const selectRouter = createFeatureSelector<RouterState>('router');

export const getRouterState = createSelector(
  selectRouter,
  router => router.state,
);

export const getRouterData = createSelector(
  getRouterState,
  state => state.data || {},
);

export const getRouterDataItem = (name: string): MemoizedSelector<any, any> => createSelector(
  getRouterData,
  data => data[name] ?? null,
);

export const getRouterParams = createSelector(
  getRouterState,
  state => state?.params || {},
);

export const getRouterParam = (name: string): MemoizedSelector<any, any> => createSelector(
  getRouterParams,
  params => params[name] ?? null,
);

export const getRouterQueryParams = createSelector(
  getRouterState,
  state => state.queryParams || {},
);

export const getRouterUrl = createSelector(
  getRouterState,
  state => state.url || '',
);
