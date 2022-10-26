import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { AddCategoryDialogComponent } from '../../../../shared/modules/add-category-dialog';
import { AddTransactionDialogComponent } from '../../../../shared/modules/add-transaction-dialog';
import { AccountsFacade, CategoriesFacade, TransactionsFacade } from '../../../../state';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class AccountsViewComponent implements OnInit {
  public readonly accounts$ = this.accountsFacade.accounts$;
  public readonly accountsLoading$ = this.accountsFacade.accountsLoading$;
  public readonly accountsLoaded$ = this.accountsFacade.accountsLoaded$;
  public readonly accountsError$ = this.accountsFacade.accountsError$;

  public readonly items = [
    { label: 'Daily' },
    { label: 'Weekly' },
    { label: 'Monthly' },
    { label: 'Yearly' },
  ];

  constructor(
    private readonly accountsFacade: AccountsFacade,
    private readonly dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.loadAccounts();
  }

  public onAddAccount(): void {
    this.dialogService.open(AddCategoryDialogComponent, {
      header: 'Add account',
    });
  }

  public loadAccounts(): void {
    this.accountsFacade.loadAccounts();
  }
}
