import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { keyBy } from 'lodash';
import { DialogService } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  combineLatestWith,
  filter,
  Subject,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { AppRoute } from '../../../../enums/app-route.enum';
import { DatePeriod } from '../../../../enums/date-period.enum';
import { datePeriodToTimestamp } from '../../../../shared/helpers/date-period-to-timestamp';
import { isNotNullOrUndefined } from '../../../../shared/helpers/not-null-or-undefined';
import { AddCategoryDialogComponent } from '../../../../shared/modules/add-category-dialog';
import { AddTransactionDialogComponent } from '../../../../shared/modules/add-transaction-dialog';
import { AccountsFacade, CategoriesFacade, TransactionsFacade } from '../../../../state';
import { RouterFacade } from '../../../../state/router';
import { groupTransactionsByDate } from '../../mappers/group-transactions-by-date.mapper';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class TransactionsViewComponent implements OnInit, OnDestroy {
  public readonly transactions$ = this.transactionsFacade.transactions$.pipe(
    map((transactions) => groupTransactionsByDate(transactions)),
  );
  public readonly transactionsLoading$ = this.transactionsFacade.transactionsLoading$;
  public readonly transactionsLoaded$ = this.transactionsFacade.transactionsLoaded$;
  public readonly transactionsError$ = this.transactionsFacade.transactionsError$;
  public readonly transactionsTotalBalance$ = this.transactionsFacade.transactionsTotalBalance$;

  public readonly categories$ = this.categoriesFacade.categories$.pipe(
    map((categories) => keyBy(categories, 'uid')),
  );
  public readonly categoriesLoaded$ = this.categoriesFacade.categoriesLoaded$;

  public readonly period$ = new BehaviorSubject<DatePeriod>(DatePeriod.Month);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly accountsFacade: AccountsFacade,
    private readonly categoriesFacade: CategoriesFacade,
    private readonly transactionsFacade: TransactionsFacade,
    private readonly routerFacade: RouterFacade,
    private readonly dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.routerFacade.getParam('accountName')
      .pipe(takeUntil(this.destroy$))
      .subscribe((alias) => {
        this.accountsFacade.loadAccount(alias);
      });

    this.accountsFacade.selectedAccount$
      .pipe(
        filter(isNotNullOrUndefined),
        combineLatestWith(this.period$),
        takeUntil(this.destroy$),
      )
      .subscribe(([{ uid }, period]) => {
        this.transactionsFacade.loadTransactions({
          accountId: uid,
          period: datePeriodToTimestamp(period),
        });
      });

    this.accountsFacade.onLoadAccountError$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate([AppRoute.Accounts]);
      });

    this.categoriesFacade.loadCategories();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadTransactions(): void {
    this.accountsFacade.selectedAccount$
      .pipe(
        withLatestFrom(this.period$),
        take(1),
      )
      .subscribe(([{ uid }, period]) => {
        this.transactionsFacade.loadTransactions({
          accountId: uid,
          period: datePeriodToTimestamp(period),
        });
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
          },
        });
      });
  }
}
