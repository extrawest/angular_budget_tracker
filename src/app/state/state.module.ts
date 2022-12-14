import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AccountsEffects, reducer as accountsReducer } from './accounts';
import { CategoriesEffects, reducer as categoriesReducer } from './categories';
import { StoreKey } from './constants';
import { reducers } from './reducers';
import { CustomRouterSerializer } from './router';
import { TransactionsEffects, reducer as transactionsReducer } from './transactions';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),

    EffectsModule.forFeature([
      AccountsEffects,
      CategoriesEffects,
      TransactionsEffects,
    ]),

    StoreModule.forFeature(StoreKey.Accounts, accountsReducer),
    StoreModule.forFeature(StoreKey.Categories, categoriesReducer),
    StoreModule.forFeature(StoreKey.Transactions, transactionsReducer),

    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
      serializer: CustomRouterSerializer,
    }),
  ],
})
export class StateModule { }
