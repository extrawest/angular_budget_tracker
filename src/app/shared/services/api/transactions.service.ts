import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, Observable, switchMap, take } from 'rxjs';

import { AddTransactionParams } from '../../../models/add-transaction-params.model';
import { Transaction } from '../../../models/transaction.model';
import { TransactionsParams } from '../../../models/transactions-params';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class TransactionsApiService {
  private readonly collectionPath = 'transactions';

  constructor(private readonly firestore: AngularFirestore) {}

  public fetchTransactions(params: TransactionsParams): Observable<Transaction[]> {
    return this.firestore.collection<Transaction>(
      this.collectionPath,
      (ref) => {
        let query = ref
          .where('userId', '==', params.userId)
          .where('accountId', '==', params.accountId);

        if (params.period) {
          query = query.where('createdAt', '>=', params.period);
        }

        return query;
      },
    )
      .valueChanges({ idField: 'uid' });
  }

  public addTransaction(transaction: AddTransactionParams): Observable<Transaction> {
    return from(this.firestore.collection(this.collectionPath).add(transaction))
      .pipe(
        switchMap((docRef) => this.firestore.doc<Transaction>(docRef.path).valueChanges()),
        take(1),
        filter(isNotNullOrUndefined),
      );
  }
}
