import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, Observable, take } from 'rxjs';

import { AppRoute } from '../../../enums/app-route.enum';
import { AddTransactionDialogParams } from '../../../models/add-transaction-dialog-params.model';
import { BackLink } from '../../../models/back-link.model';
import { AccountsFacade } from '../../../state';
import { isNotNullOrUndefined } from '../../helpers/not-null-or-undefined';
import { AuthService } from '../../services/auth.service';
import { AddAccountDialogComponent } from '../add-account-dialog';
import { AddCategoryDialogComponent } from '../add-category-dialog';
import { AddTransactionDialogComponent } from '../add-transaction-dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class HeaderComponent {
  @Input() public backLink: BackLink;
  @Input() public title: string;

  public readonly user$: Observable<User> = this.authService.currentUser$.pipe(
    filter(isNotNullOrUndefined),
  );

  public readonly AppRoute = AppRoute;

  public readonly addItemMenu: MenuItem[] = [
    { label: 'Add Account', command: () => this.onAddAccount() },
    { label: 'Add Category', command: () => this.onAddCategory() },
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

  public onAddAccount(): void {
    this.dialogService.open(AddAccountDialogComponent, {
      header: 'Add account',
      width: '500px',
    });
  }

  public onAddCategory(): void {
    this.dialogService.open(AddCategoryDialogComponent, {
      header: 'Add category',
      width: '500px',
    });
  }

  public onAddTransaction(): void {
    this.accountsFacade.selectedAccount$
      .pipe(take(1))
      .subscribe(({ uid }) => {
        this.dialogService.open(AddTransactionDialogComponent, {
          header: 'Add transaction',
          width: '500px',
          data: {
            selectedAccountId: uid,
          } as AddTransactionDialogParams,
        });
      });
  }
}
