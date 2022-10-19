import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TransactionsEffects, reducer as transactionsReducer } from './transactions';
import { CategoriesEffects, reducer as categoriesReducer } from './categories';
import { StoreKey } from './constants';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      CategoriesEffects,
      TransactionsEffects,
    ]),

    StoreModule.forFeature(StoreKey.Categories, categoriesReducer),
    StoreModule.forFeature(StoreKey.Transactions, transactionsReducer),
  ],
})
export class StateModule { }
