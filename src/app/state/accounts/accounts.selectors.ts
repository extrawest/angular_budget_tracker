import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreKey } from '../constants';

import { AccountsState } from './accounts.reducer';

const getState = createFeatureSelector<AccountsState>(StoreKey.Accounts);

export const getAccountsState = createSelector(
  getState,
  (state) => state.accounts,
);

export const getAccounts = createSelector(
  getAccountsState,
  (state) => state.data,
);

export const getAccountsLoading = createSelector(
  getAccountsState,
  (state) => state.loading,
);

export const getAccountsLoaded = createSelector(
  getAccountsState,
  (state) => state.loaded,
);

export const getAccountsError = createSelector(
  getAccountsState,
  (state) => state.error,
);

export const getSelectedAccountState = createSelector(
  getState,
  (state) => state.selectedAccount,
);

export const getSelectedAccount = createSelector(
  getSelectedAccountState,
  (state) => state.data,
);

export const getSelectedAccountLoading = createSelector(
  getSelectedAccountState,
  (state) => state.loading,
);

export const getSelectedAccountLoaded = createSelector(
  getSelectedAccountState,
  (state) => state.loaded,
);

export const getSelectedAccountError = createSelector(
  getSelectedAccountState,
  (state) => state.error,
);

export const getAccountsTotalBalance = createSelector(
  getState,
  (state) => state.totalBalance,
);
