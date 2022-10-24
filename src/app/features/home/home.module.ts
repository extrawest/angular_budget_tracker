import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';

import { DataCardModule } from '../../shared/modules/data-card';
import { DataPlaceholderModule } from '../../shared/modules/data-placeholder';
import { SvgIconModule } from '../../shared/modules/svg-icon';

import { CategoriesComponent, TransactionsComponent } from './components';
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
    MenuModule,
    TagModule,
    DataCardModule,
    DataPlaceholderModule,
    SvgIconModule,
  ],
})
export class HomeModule { }
