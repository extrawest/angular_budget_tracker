import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { MenuItem } from 'primeng/api';
import { filter, Observable } from 'rxjs';

import { AppRoute } from '../../../enums/app-route.enum';
import { BackLink } from '../../../models/back-link.model';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() backLink: BackLink;
  @Input() title: string;

  public readonly user$: Observable<User> = this.authService.currentUser$.pipe(filter(isNotNullOrUndefined));

  public readonly AppRoute = AppRoute;
  public readonly walletMenu: MenuItem[] = [
    { label: 'Credit card' },
    { label: 'Salary card' },
  ];
  public readonly addItemMenu: MenuItem[] = [
    { label: 'Add Account' },
    { label: 'Add Category' },
    { label: 'Add Transaction' },
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
