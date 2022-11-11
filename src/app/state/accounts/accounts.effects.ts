import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AccountsApiService } from '../../shared/services/api/accounts.service';
import { TransactionsApiService } from '../../shared/services/api/transactions.service';
import { UserService } from '../../shared/services/api/user.service';

import {
  AccountsActionTypes,
  addAccount, addAccountError, addAccountSuccess, loadAccount, loadAccountError,
  loadAccounts,
  loadAccountsError,
  loadAccountsSuccess, loadAccountSuccess,
} from './accounts.actions';

@Injectable()
export class AccountsEffects {
  public readonly accounts$ = createEffect(() => this.actions$.pipe(
    ofType(AccountsActionTypes.LoadAccounts),
    fetch({
      id: (action) => [action.type, action.params],
      run: ({ params }) => {
        return this.userService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.accountsApiService.fetchAccounts({ ...params, userId: user.uid })),
          map((accounts) => loadAccountsSuccess({ accounts })),
        );
      },
      onError: (action: ReturnType<typeof loadAccounts>, error: HttpErrorResponse) => {
        return loadAccountsError({ error });
      },
    }),
  ));

  public readonly account$ = createEffect(() => this.actions$.pipe(
    ofType(AccountsActionTypes.LoadAccount),
    fetch({
      id: (action) => action.type,
      run: (action) => {
        return this.userService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.accountsApiService.fetchAccount({
            userId: user.uid,
            alias: action.alias,
          })),
          map((account) => loadAccountSuccess({ account })),
        );
      },
      onError: (action: ReturnType<typeof loadAccount>, error: HttpErrorResponse) => {
        return loadAccountError({ error });
      },
    }),
  ));

  public readonly addAccount$ = createEffect(() => this.actions$.pipe(
    ofType(AccountsActionTypes.AddAccount),
    pessimisticUpdate({
      run: ({ params }: ReturnType<typeof addAccount>) => {
        return this.userService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.accountsApiService.addAccount({ userId: user.uid, ...params })),
          map((account) => addAccountSuccess({ account })),
        );
      },
      onError: (action: ReturnType<typeof addAccount>, error: HttpErrorResponse) => {
        return addAccountError({ error });
      },
    }),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly accountsApiService: AccountsApiService,
    private readonly transactionsApiService: TransactionsApiService,
    private readonly userService: UserService,
  ) {}
}
