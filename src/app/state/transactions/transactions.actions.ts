import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { AddCategoryParams } from '../../models/add-category-params';
import {Transaction} from "../../models/transaction.model";

export enum TransactionsActionTypes {
  LoadTransactions = '[Transactions] Load Transactions',
  LoadTransactionsSuccess = '[Transactions] Load Transactions Success',
  LoadTransactionsError = '[Transactions] Load Transactions Error',

  AddTransaction = '[Transactions] Add Transaction',
  AddTransactionSuccess = '[Transactions] Add Transaction Success',
  AddTransactionError = '[Transactions] Add Transaction Error',

  DeleteTransaction = '[Transactions] Delete Transaction',
  DeleteTransactionSuccess = '[Transactions] Delete Transaction Success',
  DeleteTransactionError = '[Transactions] Delete Transaction Error',
}

export const loadTransactions = createAction(
  TransactionsActionTypes.LoadTransactions,
);

export const loadTransactionsSuccess = createAction(
  TransactionsActionTypes.LoadTransactionsSuccess,
  props<{ transactions: Transaction[] }>(),
);

export const loadTransactionsError = createAction(
  TransactionsActionTypes.LoadTransactionsError,
  props<{ error: HttpErrorResponse }>(),
);

export const addTransaction = createAction(
  TransactionsActionTypes.AddTransaction,
  props<{ params: AddCategoryParams }>(),
);

export const addTransactionSuccess = createAction(
  TransactionsActionTypes.AddTransactionSuccess,
  props<{ transaction: Transaction }>(),
);

export const addTransactionError = createAction(
  TransactionsActionTypes.AddTransactionError,
  props<{ error: HttpErrorResponse }>(),
);

export const deleteTransaction = createAction(
  TransactionsActionTypes.DeleteTransaction,
  props<{ params: AddCategoryParams }>(),
);

export const deleteTransactionSuccess = createAction(
  TransactionsActionTypes.DeleteTransactionSuccess,
  props<{ transaction: Transaction }>(),
);

export const deleteTransactionError = createAction(
  TransactionsActionTypes.DeleteTransactionError,
  props<{ error: HttpErrorResponse }>(),
);