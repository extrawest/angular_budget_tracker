import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { AddCategoryParams } from '../../models/add-category-params';
import { Category } from '../../models/category.model';

export enum CategoriesActionTypes {
  LoadCategories = '[Categories] Load Categories',
  LoadCategoriesSuccess = '[Categories] Load Categories Success',
  LoadCategoriesError = '[Categories] Load Categories Error',

  AddCategory = '[Categories] Add Category',
  AddCategorySuccess = '[Categories] Add Category Success',
  AddCategoryError = '[Categories] Add Category Error',
}

export const loadCategories = createAction(
  CategoriesActionTypes.LoadCategories,
);

export const loadCategoriesSuccess = createAction(
  CategoriesActionTypes.LoadCategoriesSuccess,
  props<{ categories: Category[] }>(),
);

export const loadCategoriesError = createAction(
  CategoriesActionTypes.LoadCategoriesError,
  props<{ error: HttpErrorResponse }>(),
);

export const addCategory = createAction(
  CategoriesActionTypes.AddCategory,
  props<{ params: AddCategoryParams }>(),
);

export const addCategorySuccess = createAction(
  CategoriesActionTypes.AddCategorySuccess,
  props<{ category: Category }>(),
);

export const addCategoryError = createAction(
  CategoriesActionTypes.AddCategoryError,
  props<{ error: HttpErrorResponse }>(),
);
