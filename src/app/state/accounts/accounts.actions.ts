import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Account } from '../../models/account.model';

export enum AccountsActionTypes {
  LoadAccounts = '[Accounts] Load Accounts',
  LoadAccountsSuccess = '[Accounts] Load Accounts Success',
  LoadAccountsError = '[Accounts] Load Accounts Error',

  AddAccount = '[Accounts] Add Account',
  AddAccountSuccess = '[Accounts] Add Account Success',
  AddAccountError = '[Accounts] Add Account Error',
}

export const loadAccounts = createAction(
  AccountsActionTypes.LoadAccounts,
);

export const loadAccountsSuccess = createAction(
  AccountsActionTypes.LoadAccountsSuccess,
  props<{ accounts: Account[] }>(),
);

export const loadAccountsError = createAction(
  AccountsActionTypes.LoadAccountsError,
  props<{ error: HttpErrorResponse }>(),
);

export const addAccount = createAction(
  AccountsActionTypes.AddAccount,
  props<{ params: Partial<Account> }>(),
);

export const addAccountSuccess = createAction(
  AccountsActionTypes.AddAccountSuccess,
  props<{ account: Account }>(),
);

export const addAccountError = createAction(
  AccountsActionTypes.AddAccountError,
  props<{ error: HttpErrorResponse }>(),
);
