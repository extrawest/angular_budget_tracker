import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';

import { BreadcrumbsModule } from '../../shared/modules/breadcrumbs';

import { HeaderComponent } from './components';
import { DashboardViewComponent } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardViewComponent, HeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AvatarModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    OverlayPanelModule,
    SidebarModule,
    BreadcrumbsModule,
  ],
})
export class DashboardModule { }
