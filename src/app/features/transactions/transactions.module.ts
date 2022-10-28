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

import { TransactionsViewComponent } from './containers';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [TransactionsViewComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    LetModule,
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
  ],
})
export class TransactionsModule { }
