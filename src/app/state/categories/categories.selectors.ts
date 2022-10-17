import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreKey } from '../constants';

import { CategoriesState } from './categories.reducer';

const getState = createFeatureSelector<CategoriesState>(StoreKey.Categories);

const getCategories = createSelector(getState, (state) => state.data);

const getCategoriesLoading = createSelector(getState, (state) => state.loading);

const getCategoriesError = createSelector(getState, (state) => state.error);

export const categoriesQuery = {
  getCategories,
  getCategoriesLoading,
  getCategoriesError,
};
