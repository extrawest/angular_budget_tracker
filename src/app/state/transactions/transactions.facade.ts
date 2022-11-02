import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AddTransactionParams } from '../../models/add-transaction-params.model';
import { TransactionsParams } from '../../models/transactions-params';

import {
  addTransaction,
  addTransactionError,
  addTransactionSuccess,
  loadTransactions,
  TransactionsActionTypes,
} from './transactions.actions';
import { TransactionsState } from './transactions.reducer';
import {
  getTransactions,
  getTransactionsError,
  getTransactionsLoaded,
  getTransactionsLoading, getTransactionsTotalBalance,
} from './transactions.selectors';

@Injectable({ providedIn: 'root' })
export class TransactionsFacade {
  public readonly transactions$ = this.store.select(getTransactions);
  public readonly transactionsLoading$ = this.store.select(getTransactionsLoading);
  public readonly transactionsLoaded$ = this.store.select(getTransactionsLoaded);
  public readonly transactionsError$ = this.store.select(getTransactionsError);
  public readonly transactionsTotalBalance$ = this.store.select(getTransactionsTotalBalance);

  public readonly onAddTransactionSuccess$: Observable<ReturnType<typeof addTransactionSuccess>> = this.actions$.pipe(
    ofType(TransactionsActionTypes.AddTransactionSuccess),
  );
  public readonly onAddTransactionError$: Observable<ReturnType<typeof addTransactionError>> = this.actions$.pipe(
    ofType(TransactionsActionTypes.AddTransactionError),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TransactionsState>,
  ) {}

  public loadTransactions(params: Partial<TransactionsParams>): void {
    this.store.dispatch(loadTransactions({ params }));
  }

  public addTransaction(params: AddTransactionParams): void {
    this.store.dispatch(addTransaction({ params }));
  }
}
