import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { sumBy } from 'lodash';
import { defaultIfEmpty, filter, forkJoin, from, Observable, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountParams } from '../../../models/account-params.model';
import { Account } from '../../../models/account.model';
import { AccountsParams } from '../../../models/accounts-params.model';
import { AddAccountParams } from '../../../models/add-account-params.model';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

import { TransactionsApiService } from './transactions.service';

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  private readonly collectionPath = 'accounts';

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly transactionsApiService: TransactionsApiService,
  ) {}

  public fetchAccounts(params: AccountsParams): Observable<Account[]> {
    return this.firestore.collection<Account>(
      this.collectionPath,
      (ref) => ref.where('userId', '==', params.userId),
    )
      .valueChanges({ idField: 'uid' })
      .pipe(
        switchMap((accounts) => {
          return forkJoin(
            accounts.map((account) => this.transactionsApiService
              .fetchTransactions({ ...params, accountId: account.uid })
              .pipe(
                take(1),
                map((transactions) => ({ ...account, balance: sumBy(transactions, ({ amount }) => amount) })),
              ),
            ),
          ).pipe(defaultIfEmpty([]));
        }),
        take(1),
      );
  }

  public fetchAccount({ userId, alias }: AccountParams): Observable<Account> {
    return this.firestore.collection<Account>(
      this.collectionPath,
      (ref) => ref
        .where('userId', '==', userId)
        .where('alias', '==', alias),
    )
      .valueChanges({ idField: 'uid' })
      .pipe(
        take(1),
        map(([account]) => {
          if (!account) {
            throw new Error('There are no accounts with provided alias!');
          }

          return account;
        }),
      );
  }

  public addAccount(account: AddAccountParams): Observable<Account> {
    return from(this.firestore.collection(this.collectionPath).add(account))
      .pipe(
        switchMap(({ path }) => this.firestore.doc<Account>(path).valueChanges({ idField: 'uid' })),
        take(1),
        filter(isNotNullOrUndefined),
      );
  }
}
