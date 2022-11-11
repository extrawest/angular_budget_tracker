import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreKey } from '../constants';

import { transactionsAdapter, TransactionsState } from './transactions.reducer';

const { selectAll } = transactionsAdapter.getSelectors();

const getState = createFeatureSelector<TransactionsState>(StoreKey.Transactions);

export const getTransactions = createSelector(
  getState,
  (state) => selectAll(state.data),
);

export const getTransactionsLoading = createSelector(
  getState,
  (state) => state.loading,
);

export const getTransactionsLoaded = createSelector(
  getState,
  (state) => state.loaded,
);

export const getTransactionsError = createSelector(
  getState,
  (state) => state.error,
);

export const getTransactionsTotalBalance = createSelector(
  getState,
  (state) => state.totalBalance,
);
