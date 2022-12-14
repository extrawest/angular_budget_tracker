import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, Observable, switchMap, take } from 'rxjs';

import { AddCategoryParams } from '../../../models/add-category-params';
import { Category } from '../../../models/category.model';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {
  private readonly collectionPath = 'categories';

  constructor(private readonly firestore: AngularFirestore) {}

  public fetchCategories(userId: string): Observable<Category[]> {
    return this.firestore.collection<Category>(
      this.collectionPath,
      (ref) => ref.where('userId', '==', userId),
    ).valueChanges({ idField: 'uid' });
  }

  public addCategory(params: AddCategoryParams): Observable<Category> {
    return from(this.firestore.collection(this.collectionPath).add(params)).pipe(
      switchMap((docRef) => this.firestore.doc<Category>(docRef.path).valueChanges()),
      take(1),
      filter(isNotNullOrUndefined),
    );
  }
}
