import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CategoriesApiService } from '../../shared/services/api/categories.service';
import { AuthService } from '../../shared/services/auth.service';

import {
  addCategory, addCategoryError, addCategorySuccess,
  CategoriesActionTypes, loadCategories, loadCategoriesError, loadCategoriesSuccess,
} from './categories.actions';

@Injectable()
export class CategoriesEffects {
  public readonly categories$ = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActionTypes.LoadCategories),
    fetch({
      run: () => {
        return this.authService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.categoriesApiService.fetchCategories(user.uid)),
          map((categories) => loadCategoriesSuccess({ categories })),
        );
      },
      onError: (action: ReturnType<typeof loadCategories>, error: HttpErrorResponse) => {
        return loadCategoriesError({ error });
      },
    }),
  ));

  public readonly addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActionTypes.AddCategory),
    pessimisticUpdate({
      run: ({ params }: ReturnType<typeof addCategory>) => {
        return this.authService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.categoriesApiService.addCategory({ userId: user.uid, ...params })),
          map((category) => addCategorySuccess({ category })),
        );
      },
      onError: (action: ReturnType<typeof addCategory>, error: HttpErrorResponse) => {
        return addCategoryError({ error });
      },
    }),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly categoriesApiService: CategoriesApiService,
    private readonly authService: AuthService,
  ) {}
}
