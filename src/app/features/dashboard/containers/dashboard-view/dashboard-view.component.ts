import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoute } from '../../../../enums/app-route.enum';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  public onLogout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/', AppRoute.Auth]);
    });
  }
}
