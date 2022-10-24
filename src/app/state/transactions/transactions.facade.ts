import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AddCategoryParams } from '../../models/add-category-params';

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
  getTransactionsLoading,
} from './transactions.selectors';

@Injectable({ providedIn: 'root' })
export class TransactionsFacade {
  public readonly transactions$ = this.store.select(getTransactions);
  public readonly transactionsLoading$ = this.store.select(getTransactionsLoading);
  public readonly transactionsLoaded$ = this.store.select(getTransactionsLoaded);
  public readonly transactionsError$ = this.store.select(getTransactionsError);

  public readonly onAddCategorySuccess$: Observable<ReturnType<typeof addTransactionSuccess>> = this.actions$.pipe(
    ofType(TransactionsActionTypes.AddTransactionSuccess),
  );
  public readonly onAddCategoryError$: Observable<ReturnType<typeof addTransactionError>> = this.actions$.pipe(
    ofType(TransactionsActionTypes.AddTransactionError),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TransactionsState>,
  ) {}

  public loadTransactions(): void {
    this.store.dispatch(loadTransactions());
  }

  public addTransaction(params: AddCategoryParams): void {
    this.store.dispatch(addTransaction({ params }));
  }
}
