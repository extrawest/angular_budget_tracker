import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AddCategoryParams } from '../../models/add-category-params';

import {
  addCategory,
  addCategoryError,
  addCategorySuccess,
  CategoriesActionTypes,
  loadCategories
} from './categories.actions';
import { CategoriesState } from './categories.reducer';
import {getCategories, getCategoriesError, getCategoriesLoaded, getCategoriesLoading} from "./categories.selectors";

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  public readonly categories$ = this.store.select(getCategories);
  public readonly categoriesLoading$ = this.store.select(getCategoriesLoading);
  public readonly categoriesLoaded$ = this.store.select(getCategoriesLoaded);
  public readonly categoriesError$ = this.store.select(getCategoriesError);

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

  public loadCategories(): void {
    this.store.dispatch(loadCategories());
  }

  public addCategory(params: AddCategoryParams): void {
    this.store.dispatch(addCategory({ params }));
  }
}
