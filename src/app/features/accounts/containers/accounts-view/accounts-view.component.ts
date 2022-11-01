import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import slugify from 'slugify';

import { AppRoute } from '../../../../enums/app-route.enum';
import { Account } from '../../../../models/account.model';
import { AddAccountDialogComponent } from '../../../../shared/modules/add-account-dialog';
import { AccountsFacade } from '../../../../state';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-transactions-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class AccountsViewComponent {
  public readonly accounts$ = this.accountsFacade.accounts$;
  public readonly accountsLoading$ = this.accountsFacade.accountsLoading$;
  public readonly accountsLoaded$ = this.accountsFacade.accountsLoaded$;
  public readonly accountsError$ = this.accountsFacade.accountsError$;
  public readonly accountsTotalBalance$ = this.accountsFacade.accountsTotalBalance$;

  constructor(
    private readonly router: Router,
    private readonly accountsFacade: AccountsFacade,
    private readonly dialogService: DialogService,
  ) {}

  public onAddAccount(): void {
    this.dialogService.open(AddAccountDialogComponent, {
      header: 'Add account',
      width: '400px',
    });
  }

  public loadAccounts(period?: number): void {
    this.accountsFacade.loadAccounts({ period });
  }

  public onSelectAccount(account: Account): void {
    this.router.navigate([AppRoute.Transactions, slugify(account.name, { lower: true })]);
  }
}
