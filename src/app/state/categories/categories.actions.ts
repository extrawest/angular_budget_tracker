import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { AddCategoryParams } from '../../models/add-category-params';
import { Category } from '../../models/category.model';

export enum CategoriesActionTypes {
  GetCategories = '[Categories] Get Categories',
  GetCategoriesSuccess = '[Categories] Get Categories Success',
  GetCategoriesError = '[Categories] Get Categories Error',

  AddCategory = '[Categories] Add Category',
  AddCategorySuccess = '[Categories] Add Category Success',
  AddCategoryError = '[Categories] Add Category Error',
}

export const getCategories = createAction(
  CategoriesActionTypes.GetCategories,
);

export const getCategoriesSuccess = createAction(
  CategoriesActionTypes.GetCategoriesSuccess,
  props<{ categories: Category[] }>(),
);

export const getCategoriesError = createAction(
  CategoriesActionTypes.GetCategoriesError,
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

export const fromCategoriesActions = {
  getCategories,
  getCategoriesSuccess,
  getCategoriesError,

  addCategory,
  addCategorySuccess,
  addCategoryError,
};
