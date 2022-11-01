import { Action, createReducer, on } from '@ngrx/store';

import { Account } from '../../models/account.model';
import { ItemState } from '../../models/item-state.model';

import {
  loadAccount,
  loadAccounts,
  loadAccountsError,
  loadAccountsSuccess,
  loadAccountSuccess,
} from './accounts.actions';

export interface AccountsState {
  accounts: ItemState<Account[]>;
  totalBalance: number;
  selectedAccount: ItemState<Account>;
}

export const initialAccountsState: AccountsState = {
  accounts: {
    data: null,
    loaded: false,
    loading: false,
    error: null,
  },
  selectedAccount: {
    data: null,
    loaded: false,
    loading: false,
    error: null,
  },
  totalBalance: 0,
};

export const accountsReducer = createReducer(
  initialAccountsState,
  on(
    loadAccounts,
    state => ({
      ...state,
      accounts: {
        ...state.accounts,
        loaded: false,
        loading: true,
        error: null,
      },
    }),
  ),
  on(
    loadAccountsSuccess,
    (state, { accounts }) => ({
      ...state,
      accounts: {
        ...state.accounts,
        data: accounts,
        loaded: true,
        loading: false,
        error: null,
      },
      totalBalance: accounts.reduce((acc, { balance }) => acc + balance, 0),
    }),
  ),
  on(
    loadAccountsError,
    (state, { error }) => ({
      ...state,
      loaded: false,
      loading: false,
      error,
    }),
  ),
  on(
    loadAccount,
    state => ({
      ...state,
      loaded: false,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadAccountSuccess,
    (state, { account }) => ({
      ...state,
      selectedAccount: {
        ...state.selectedAccount,
        data: account,
        loaded: true,
        loading: false,
        error: null,
      },
    }),
  ),
  on(
    loadAccountsError,
    (state, { error }) => ({
      ...state,
      selectedAccount: {
        ...state.selectedAccount,
        loaded: false,
        loading: false,
        error,
      },
    }),
  ),
);

export function reducer(state: AccountsState, action: Action): AccountsState {
  return accountsReducer(state, action);
}
