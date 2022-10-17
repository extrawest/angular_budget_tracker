import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { MenuItem } from 'primeng/api';
import { filter, Observable } from 'rxjs';

import { AppRoute } from '../../../../enums/app-route.enum';
import { isNotNullOrUndefined } from '../../../../shared/helpers/not-null-or-undefined';
import { AuthService } from '../../../../shared/services/auth.service';
import { DashboardRoute } from '../../enums/dashboard-route.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly user$: Observable<User> = this.authService.currentUser$.pipe(filter(isNotNullOrUndefined));
  public readonly DashboardRoute = DashboardRoute;
  public readonly walletMenu: MenuItem[] = [
    { label: 'Credit card' },
    { label: 'Salary card' },
  ];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  public onLogout(): void {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/', AppRoute.Auth]);
    });
  }
}
