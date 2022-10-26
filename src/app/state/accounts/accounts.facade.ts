import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Account } from '../../models/account.model';

import { AccountsActionTypes, addAccount, addAccountError, addAccountSuccess, loadAccounts } from './accounts.actions';
import { AccountsState } from './accounts.reducer';
import { getAccounts, getAccountsError, getAccountsLoaded, getAccountsLoading } from './accounts.selectors';

@Injectable({ providedIn: 'root' })
export class AccountsFacade {
  public readonly accounts$ = this.store.select(getAccounts);
  public readonly accountsLoading$ = this.store.select(getAccountsLoading);
  public readonly accountsLoaded$ = this.store.select(getAccountsLoaded);
  public readonly accountsError$ = this.store.select(getAccountsError);

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

  public loadAccounts(): void {
    this.store.dispatch(loadAccounts());
  }

  public addAccount(params: Partial<Account>): void {
    this.store.dispatch(addAccount({ params }));
  }
}
