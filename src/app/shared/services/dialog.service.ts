import { Injectable } from '@angular/core';
import { DialogService as PrimeNGDialogService } from 'primeng/dynamicdialog';

import { AddAccountDialogComponent } from '../modules/add-account-dialog';
import { AddCategoryDialogComponent } from '../modules/add-category-dialog';
import { AddTransactionDialogComponent } from '../modules/add-transaction-dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(
    private readonly dialogService: PrimeNGDialogService,
  ) {}

  public openAddCategoryDialog(): void {
    this.dialogService.open(AddCategoryDialogComponent, {
      header: 'Add category',
      width: '500px',
    });
  }

  public openAddAccountDialog(): void {
    this.dialogService.open(AddAccountDialogComponent, {
      header: 'Add account',
      width: '500px',
    });
  }

  public openAddTransactionDialog(selectedAccountId: string): void {
    this.dialogService.open(AddTransactionDialogComponent, {
      header: 'Add transaction',
      width: '500px',
      data: {
        selectedAccountId,
      },
    });
  }
}
