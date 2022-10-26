import { Action, createReducer, on } from '@ngrx/store';

import { Account } from '../../models/account.model';
import { ItemState } from '../../models/item-state.model';

import { addAccountError, loadAccounts, loadAccountsError, loadAccountsSuccess } from './accounts.actions';

export type AccountsState = ItemState<Account[]>;

export const initialAccountsState: AccountsState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
};

export const accountsReducer = createReducer(
  initialAccountsState,
  on(
    loadAccounts,
    state => ({
      ...state,
      loaded: false,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadAccountsSuccess,
    (state, { accounts }) => ({
      ...state,
      data: accounts,
      loaded: true,
      loading: false,
      error: null,
    }),
  ),
  on(
    addAccountError,
    loadAccountsError,
    (state, { error }) => ({
      ...state,
      loaded: false,
      loading: false,
      error,
    }),
  ),
);

export function reducer(state: AccountsState, action: Action): AccountsState {
  return accountsReducer(state, action);
}
