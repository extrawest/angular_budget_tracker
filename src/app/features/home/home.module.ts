import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';

import { SvgIconModule } from '../../shared/modules/svg-icon';

import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HomeViewComponent } from './containers';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeViewComponent,
    TransactionsComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    MenuModule,
    TagModule,
    SvgIconModule,
  ],
})
export class HomeModule { }
