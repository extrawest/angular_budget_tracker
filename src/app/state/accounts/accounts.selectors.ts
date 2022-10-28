import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreKey } from '../constants';

import { AccountsState } from './accounts.reducer';

const getState = createFeatureSelector<AccountsState>(StoreKey.Accounts);

export const getAccounts = createSelector(
  getState,
  (state) => state.data,
);

export const getAccountsLoading = createSelector(
  getState,
  (state) => state.loading,
);

export const getAccountsLoaded = createSelector(
  getState,
  (state) => state.loaded,
);

export const getAccountsError = createSelector(
  getState,
  (state) => state.error,
);

export const getAccountsTotalBalance = createSelector(
  getState,
  (state) => state.totalBalance,
);
