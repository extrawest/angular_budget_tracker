import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, Observable, switchMap, take } from 'rxjs';

import { Category } from '../../../models/category.model';
import { Transaction } from '../../../models/transaction.model';
import { TransactionsParams } from '../../../models/transactions-params';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class TransactionsApiService {
  private readonly collectionPath = 'transactions';

  constructor(private readonly firestore: AngularFirestore) {}

  public fetchTransactions({ userId, accountId }: Partial<TransactionsParams>): Observable<Transaction[]> {
    return this.firestore.collection<Transaction>(
      this.collectionPath,
      (ref) => ref
        .where('userId', '==', userId)
        .where('accountId', '==', accountId),
    ).valueChanges({ idField: 'uid' });
  }

  public addTransaction(transaction: Partial<Category>): Observable<Transaction> {
    return from(this.firestore.collection(this.collectionPath).add(transaction)).pipe(
      switchMap((docRef) => this.firestore.doc<Transaction>(docRef.path).valueChanges()),
      take(1),
      filter(isNotNullOrUndefined),
    );
  }

  // public deleteTransaction(transaction: Partial<Category>): Observable<Category> {
  //   return from(this.firestore.collection(this.collectionPath).(category)).pipe(
  //     switchMap((docRef) => this.firestore.doc<Category>(docRef.path).valueChanges()),
  //     take(1),
  //     filter(isNotNullOrUndefined),
  //   );
  // }
}
