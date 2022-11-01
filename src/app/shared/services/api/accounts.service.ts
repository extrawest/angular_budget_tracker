import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {filter, from, Observable, switchMap, take} from 'rxjs';

import { Account } from '../../../models/account.model';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';
import {AccountParams} from "../../../models/account-params.model";
import {map} from "rxjs/operators";
import {AddAccountParams} from "../../../models/add-account-params.model";
import {AccountsParams} from "../../../models/accounts-params.model";

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  private readonly collectionPath = 'accounts';

  constructor(
    private readonly firestore: AngularFirestore,
  ) {}

  public fetchAccounts(params: AccountsParams): Observable<Account[]> {
    return this.firestore.collection<Account>(
      this.collectionPath,
      (ref) => {
        const query = ref.where('userId', '==', params.userId);

        if (params.period) {
          query.where('createdAt', '<=', params.period);
        }

        return query;
      },
    ).valueChanges({ idField: 'uid' });
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