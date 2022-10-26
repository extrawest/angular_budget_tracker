import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AccountsApiService } from '../../shared/services/api/accounts.service';
import { AuthService } from '../../shared/services/auth.service';

import {
  AccountsActionTypes,
  addAccount, addAccountError, addAccountSuccess,
  loadAccounts,
  loadAccountsError,
  loadAccountsSuccess,
} from './accounts.actions';

@Injectable()
export class AccountsEffects {
  public readonly accounts$ = createEffect(() => this.actions$.pipe(
    ofType(AccountsActionTypes.LoadAccounts),
    fetch({
      run: () => {
        return this.authService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.accountsApiService.fetchAccounts(user.uid)),
          map((accounts) => loadAccountsSuccess({ accounts })),
        );
      },
      onError: (action: ReturnType<typeof loadAccounts>, error: HttpErrorResponse) => {
        return loadAccountsError({ error });
      },
    }),
  ));

  public readonly addAccount$ = createEffect(() => this.actions$.pipe(
    ofType(AccountsActionTypes.AddAccount),
    pessimisticUpdate({
      run: ({ params }: ReturnType<typeof addAccount>) => {
        return this.authService.currentUser$.pipe(
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
    private readonly authService: AuthService,
  ) {}
}
