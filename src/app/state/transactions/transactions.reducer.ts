import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { ItemState } from '../../models/item-state.model';
import { Transaction } from '../../models/transaction.model';

import { loadTransactions, loadTransactionsError, loadTransactionsSuccess } from './transactions.actions';

export interface TransactionsState extends ItemState<EntityState<Transaction>> {
  totalBalance: number;
}

export const transactionsAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  selectId: (transaction) => transaction.uid,
});

export const initialTransactionsState: TransactionsState = {
  data: transactionsAdapter.getInitialState(),
  loading: false,
  loaded: false,
  error: null,
  totalBalance: 0,
};

export const transactionsReducer = createReducer(
  initialTransactionsState,
  on(
    loadTransactions,
    state => ({
      ...state,
      loaded: false,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadTransactionsSuccess,
    (state, { transactions }) => ({
      ...state,
      data: transactionsAdapter.setAll(transactions, state.data),
      loaded: true,
      loading: false,
      error: null,
      totalBalance: transactions.reduce((acc, { amount }) => acc + amount, 0),
    }),
  ),
  on(
    loadTransactionsError,
    (state, { error }) => ({
      ...state,
      loaded: false,
      loading: false,
      error,
    }),
  ),
);

export function reducer(state: TransactionsState, action: Action): TransactionsState {
  return transactionsReducer(state, action);
}
