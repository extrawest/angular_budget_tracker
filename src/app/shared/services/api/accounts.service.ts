import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, Observable, switchMap, take } from 'rxjs';

import { Account } from '../../../models/account.model';
import { AccountsParams } from '../../../models/accounts-params';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  private readonly collectionPath = 'accounts';

  constructor(
    private readonly firestore: AngularFirestore,
  ) {}

  public fetchAccounts({ userId }: Partial<AccountsParams>): Observable<Account[]> {
    return this.firestore.collection<Account>(
      this.collectionPath,
      (ref) => ref.where('userId', '==', userId),
    ).valueChanges({ idField: 'uid' });
  }

  public addAccount(account: Partial<Account>): Observable<Account> {
    return from(this.firestore.collection(this.collectionPath).add(account)).pipe(
      switchMap((docRef) => this.firestore.doc<Account>(docRef.path).valueChanges({ idField: 'uid' })),
      take(1),
      filter(isNotNullOrUndefined),
    );
  }
}
