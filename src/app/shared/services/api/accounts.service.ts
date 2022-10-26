import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, Observable, switchMap, take } from 'rxjs';

import { Account } from '../../../models/account.model';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  private readonly collectionPath = 'accounts';

  constructor(private readonly firestore: AngularFirestore) {}

  public fetchAccounts(userId: string): Observable<Account[]> {
    return this.firestore.collection<Account>(
      this.collectionPath,
      (ref) => ref.where('userId', '==', userId),
    ).valueChanges();
  }

  public addAccount(account: Partial<Account>): Observable<Account> {
    return from(this.firestore.collection(this.collectionPath).add(account)).pipe(
      switchMap((docRef) => this.firestore.doc<Account>(docRef.path).valueChanges()),
      take(1),
      filter(isNotNullOrUndefined),
    );
  }
}
