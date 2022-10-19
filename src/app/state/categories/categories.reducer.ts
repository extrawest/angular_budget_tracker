import { HttpErrorResponse } from '@angular/common/http';
import { Action, createReducer, on } from '@ngrx/store';

import { Category } from '../../models/category.model';

import {
  addCategoryError, loadCategories, loadCategoriesError, loadCategoriesSuccess,
} from './categories.actions';

export interface CategoriesState {
  data: Category[];
  loaded: boolean;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialCategoriesState: CategoriesState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
};

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(
    loadCategories,
    state => ({
      ...state,
      loaded: false,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadCategoriesSuccess,
    (state, { categories }) => ({
      ...state,
      data: categories,
      loaded: true,
      loading: false,
      error: null,
    }),
  ),
  on(
    addCategoryError,
    loadCategoriesError,
    (state, { error }) => ({
      ...state,
      loaded: false,
      loading: false,
      error,
    }),
  ),
);

export function reducer(state: CategoriesState, action: Action): CategoriesState {
  return categoriesReducer(state, action);
}
