import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AccountsParams } from '../../models/accounts-params.model';
import { AddAccountParams } from '../../models/add-account-params.model';

import {
  AccountsActionTypes,
  addAccount,
  addAccountError,
  addAccountSuccess,
  loadAccount, loadAccountError,
  loadAccounts, loadAccountSuccess,
} from './accounts.actions';
import { AccountsState } from './accounts.reducer';
import {
  getAccounts,
  getAccountsError,
  getAccountsLoaded,
  getAccountsLoading,
  getAccountsTotalBalance,
  getSelectedAccount,
  getSelectedAccountError,
  getSelectedAccountLoaded,
  getSelectedAccountLoading,
} from './accounts.selectors';

@Injectable({ providedIn: 'root' })
export class AccountsFacade {
  public readonly accounts$ = this.store.select(getAccounts);
  public readonly accountsLoading$ = this.store.select(getAccountsLoading);
  public readonly accountsLoaded$ = this.store.select(getAccountsLoaded);
  public readonly accountsError$ = this.store.select(getAccountsError);

  public readonly selectedAccount$ = this.store.select(getSelectedAccount);
  public readonly selectedAccountLoading$ = this.store.select(getSelectedAccountLoading);
  public readonly selectedAccountLoaded$ = this.store.select(getSelectedAccountLoaded);
  public readonly selectedAccountError$ = this.store.select(getSelectedAccountError);

  public readonly accountsTotalBalance$ = this.store.select(getAccountsTotalBalance);

  public readonly onLoadAccountSuccess$: Observable<ReturnType<typeof loadAccountSuccess>> = this.actions$.pipe(
    ofType(AccountsActionTypes.LoadAccountSuccess),
  );
  public readonly onLoadAccountError$: Observable<ReturnType<typeof loadAccountError>> = this.actions$.pipe(
    ofType(AccountsActionTypes.LoadAccountError),
  );

  public readonly onAddAccountSuccess$: Observable<ReturnType<typeof addAccountSuccess>> = this.actions$.pipe(
    ofType(AccountsActionTypes.AddAccountSuccess),
  );
  public readonly onAddAccountError$: Observable<ReturnType<typeof addAccountError>> = this.actions$.pipe(
    ofType(AccountsActionTypes.AddAccountError),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AccountsState>,
  ) {}

  public loadAccounts(params?: AccountsParams): void {
    this.store.dispatch(loadAccounts({ params }));
  }

  public loadAccount(alias: string): void {
    this.store.dispatch(loadAccount({ alias }));
  }

  public addAccount(params: AddAccountParams): void {
    this.store.dispatch(addAccount({ params }));
  }
}
