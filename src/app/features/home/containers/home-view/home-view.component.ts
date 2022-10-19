import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import { AddCategoryDialogComponent } from '../../../../shared/modules/add-category-dialog';
import {MenuItem} from "primeng/api";
import {TransactionsFacade, CategoriesFacade} from "../../../../state";
import {AddTransactionDialogComponent} from "../../../../shared/modules/add-transaction-dialog";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class HomeViewComponent implements OnInit {
  public readonly categories$ = this.categoriesFacade.categories$;
  public readonly categoriesLoading$ = this.categoriesFacade.categoriesLoading$;
  public readonly categoriesLoaded$ = this.categoriesFacade.categoriesLoaded$;
  public readonly categoriesError$ = this.categoriesFacade.categoriesError$;

  public readonly transactions$ = this.transactionsFacade.transactions$;
  public readonly transactionsLoading$ = this.transactionsFacade.transactionsLoading$;
  public readonly transactionsLoaded$ = this.transactionsFacade.transactionsLoaded$;
  public readonly transactionsError$ = this.transactionsFacade.transactionsError$;

  public readonly menu: MenuItem[] = [{
    label: 'Add category',
    command: () => this.onAddCategory(),
  }, {
    label: 'Edit categories',
  }];

  constructor(
    private readonly transactionsFacade: TransactionsFacade,
    private readonly categoriesFacade: CategoriesFacade,
    private readonly dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.categoriesFacade.loadCategories();
  }

  public onAddCategory(): void {
    this.dialogService.open(AddCategoryDialogComponent, {
      header: 'Add category',
      width: '600px',
    });
  }

  public onAddTransaction(): void {
    this.dialogService.open(AddTransactionDialogComponent, {
      header: 'Add transaction',
      width: '600px',
    });
  }
}
