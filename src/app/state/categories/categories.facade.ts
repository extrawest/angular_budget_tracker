import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AddCategoryParams } from '../../models/add-category-params';
import { Category } from '../../models/category.model';

import { addCategoryError, addCategorySuccess, CategoriesActionTypes, fromCategoriesActions } from './categories.actions';
import { CategoriesState } from './categories.reducer';
import { categoriesQuery } from './categories.selectors';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  public readonly categories$ = this.store.select(categoriesQuery.getCategories);
  public readonly categoriesLoading$ = this.store.select(categoriesQuery.getCategoriesLoading);
  public readonly categoriesError$ = this.store.select(categoriesQuery.getCategoriesError);

  public readonly onAddCategorySuccess$: Observable<ReturnType<typeof addCategorySuccess>> = this.actions$.pipe(
    ofType(CategoriesActionTypes.AddCategorySuccess),
  );
  public readonly onAddCategoryError$: Observable<ReturnType<typeof addCategoryError>> = this.actions$.pipe(
    ofType(CategoriesActionTypes.AddCategoryError),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<CategoriesState>,
  ) {}

  public getCategories(): void {
    this.store.dispatch(fromCategoriesActions.getCategories());
  }

  public addCategory(params: AddCategoryParams): void {
    this.store.dispatch(fromCategoriesActions.addCategory({ params }));
  }
}
