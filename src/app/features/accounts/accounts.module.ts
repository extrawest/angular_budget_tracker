import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LetModule } from '@ngrx/component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SkeletonModule } from 'primeng/skeleton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';

import { DataCardModule } from '../../shared/modules/data-card';
import { DataPlaceholderModule } from '../../shared/modules/data-placeholder';
import { DatePeriodTabsModule } from '../../shared/modules/date-period-tabs';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CategoriesComponent, TransactionsComponent } from './components';
import { AccountsViewComponent } from './containers';

@NgModule({
  declarations: [
    AccountsViewComponent,
    TransactionsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    LetModule,
    AccountsRoutingModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    TagModule,
    TabMenuModule,
    SkeletonModule,
    MessagesModule,
    MessageModule,
    DataCardModule,
    DataPlaceholderModule,
    DatePeriodTabsModule,
  ],
})
export class AccountsModule { }
