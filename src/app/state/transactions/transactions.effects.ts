import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TransactionsApiService } from '../../shared/services/api/transactions.service';
import { UserService } from '../../shared/services/api/user.service';

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
      id: (action) => action.type,
      run: ({ params }: ReturnType<typeof loadTransactions>) => {
        return this.userService.currentUser$.pipe(
          take(1),
          switchMap(({ uid }) => this.transactionsApiService.fetchTransactions({ ...params, userId: uid })),
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
        return this.userService.currentUser$.pipe(
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
    private readonly userService: UserService,
  ) {}
}
