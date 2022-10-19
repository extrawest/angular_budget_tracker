import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreKey } from '../constants';

import { CategoriesState } from './categories.reducer';

const getState = createFeatureSelector<CategoriesState>(StoreKey.Categories);

export const getCategories = createSelector(
  getState,
  (state) => state.data,
);

export const getCategoriesLoading = createSelector(
  getState,
  (state) => state.loading,
);

export const getCategoriesLoaded = createSelector(
  getState,
  (state) => state.loaded,
);

export const getCategoriesError = createSelector(
  getState,
  (state) => state.error,
);
