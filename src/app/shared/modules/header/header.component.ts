import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { MenuItem } from 'primeng/api';
import { filter, Observable, take } from 'rxjs';

import { AppRoute } from '../../../enums/app-route.enum';
import { BackLink } from '../../../models/back-link.model';
import { AccountsFacade } from '../../../state';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public backLink: BackLink;
  @Input() public title: string;

  public readonly user$: Observable<User> = this.authService.currentUser$.pipe(
    filter(isNotNullOrUndefined),
  );

  public readonly AppRoute = AppRoute;

  public readonly addItemMenu: MenuItem[] = [
    { label: 'Add Account', command: () => this.dialogService.openAddAccountDialog() },
    { label: 'Add Category', command: () => this.dialogService.openAddCategoryDialog() },
    { label: 'Add Transaction', command: () => this.onAddTransaction() },
  ];

  constructor(
    private readonly router: Router,
    private readonly dialogService: DialogService,
    private readonly accountsFacade: AccountsFacade,
    private readonly authService: AuthService,
  ) {}

  public onLogout(): void {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/', AppRoute.Auth]);
    });
  }

  public onAddTransaction(): void {
    this.accountsFacade.selectedAccount$
      .pipe(take(1))
      .subscribe(({ uid }) => {
        this.dialogService.openAddTransactionDialog(uid);
      });
  }
}
