import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TransactionsApiService } from '../../shared/services/api/transactions.service';
import { AuthService } from '../../shared/services/auth.service';

import {
  addTransaction,
  addTransactionError,
  addTransactionSuccess,
  loadTransactions,
  loadTransactionsError,
  loadTransactionsSuccess,
  TransactionsActionTypes,
} from './transactions.actions';

@Injectable()
export class TransactionsEffects {
  public readonly loadTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActionTypes.LoadTransactions),
    fetch({
      run: ({ params }: ReturnType<typeof loadTransactions>) => {
        return this.authService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.transactionsApiService.fetchTransactions({ ...params, userId: user.uid })),
          map((transactions) => loadTransactionsSuccess({ transactions })),
        );
      },
      onError: (action: ReturnType<typeof loadTransactions>, error: HttpErrorResponse) => {
        return loadTransactionsError({ error });
      },
    }),
  ));

  public readonly addTransaction$ = createEffect(() => this.actions$.pipe(
    ofType(TransactionsActionTypes.AddTransaction),
    pessimisticUpdate({
      run: ({ params }: ReturnType<typeof addTransaction>) => {
        return this.authService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.transactionsApiService.addTransaction({ userId: user.uid, ...params })),
          map((transaction) => addTransactionSuccess({ transaction })),
        );
      },
      onError: (action: ReturnType<typeof addTransaction>, error: HttpErrorResponse) => {
        return addTransactionError({ error });
      },
    }),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly transactionsApiService: TransactionsApiService,
    private readonly authService: AuthService,
  ) {}
}
