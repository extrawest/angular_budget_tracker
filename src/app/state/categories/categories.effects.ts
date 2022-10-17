import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, switchMap, tap } from 'rxjs/operators';

import { CategoriesApiService } from '../../shared/services/api/categories-api.service';
import { AuthService } from '../../shared/services/auth.service';

import {
  addCategory, addCategorySuccess,
  CategoriesActionTypes,
  getCategories,
  getCategoriesError,
  getCategoriesSuccess,
} from './categories.actions';
import {take} from "rxjs";

@Injectable()
export class CategoriesEffects {
  public readonly categories$ = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActionTypes.GetCategories),
    fetch({
      run: (action: ReturnType<typeof getCategories>) => {
        return this.authService.currentUser$.pipe(
          take(1),
          switchMap((user) => this.categoriesApiService.fetchCategories(user.uid)),
          map((categories) => getCategoriesSuccess({ categories })),
        );
      },
      onError: (action: ReturnType<typeof getCategories>, error: HttpErrorResponse) => {
        return getCategoriesError({ error });
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
        return getCategoriesError({ error });
      },
    }),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly categoriesApiService: CategoriesApiService,
    private readonly authService: AuthService,
  ) {
  }
}
