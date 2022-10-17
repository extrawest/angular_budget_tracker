import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CategoriesEffects } from './categories/categories.effects';
import { reducer as categoriesReducer } from './categories/categories.reducer';
import { StoreKey } from './constants';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      CategoriesEffects,
    ]),
    StoreModule.forFeature(StoreKey.Categories, categoriesReducer),
  ],
})
export class StateModule { }
