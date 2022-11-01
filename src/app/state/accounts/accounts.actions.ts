import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Account } from '../../models/account.model';
import {AddAccountParams} from "../../models/add-account-params.model";
import {AccountsParams} from "../../models/accounts-params.model";

export enum AccountsActionTypes {
  LoadAccounts = '[Accounts] Load Accounts',
  LoadAccountsSuccess = '[Accounts] Load Accounts Success',
  LoadAccountsError = '[Accounts] Load Accounts Error',

  LoadAccount = '[Accounts] Load Account',
  LoadAccountSuccess = '[Accounts] Load Account Success',
  LoadAccountError = '[Accounts] Load Account Error',

  AddAccount = '[Accounts] Add Account',
  AddAccountSuccess = '[Accounts] Add Account Success',
  AddAccountError = '[Accounts] Add Account Error',
}

export const loadAccounts = createAction(
  AccountsActionTypes.LoadAccounts,
  props<{ params: AccountsParams }>(),
);

export const loadAccountsSuccess = createAction(
  AccountsActionTypes.LoadAccountsSuccess,
  props<{ accounts: Account[] }>(),
);

export const loadAccountsError = createAction(
  AccountsActionTypes.LoadAccountsError,
  props<{ error: HttpErrorResponse }>(),
);

export const loadAccount = createAction(
  AccountsActionTypes.LoadAccount,
  props<{ alias: string }>(),
);

export const loadAccountSuccess = createAction(
  AccountsActionTypes.LoadAccountSuccess,
  props<{ account: Account }>(),
);

export const loadAccountError = createAction(
  AccountsActionTypes.LoadAccountError,
  props<{ error: HttpErrorResponse }>(),
);

export const addAccount = createAction(
  AccountsActionTypes.AddAccount,
  props<{ params: AddAccountParams }>(),
);

export const addAccountSuccess = createAction(
  AccountsActionTypes.AddAccountSuccess,
  props<{ account: Account }>(),
);

export const addAccountError = createAction(
  AccountsActionTypes.AddAccountError,
  props<{ error: HttpErrorResponse }>(),
);
