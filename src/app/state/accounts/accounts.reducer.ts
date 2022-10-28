import { Action, createReducer, on } from '@ngrx/store';

import { Account } from '../../models/account.model';
import { ItemState } from '../../models/item-state.model';

import { addAccountError, loadAccounts, loadAccountsError, loadAccountsSuccess } from './accounts.actions';

export interface AccountsState extends ItemState<Account[]> {
  totalBalance: number;
}

export const initialAccountsState: AccountsState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
  totalBalance: 0,
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
      totalBalance: accounts.reduce((acc, { balance }) => acc + balance, 0),
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
