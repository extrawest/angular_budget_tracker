import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';

import { AppRoute } from '../../../../enums/app-route.enum';
import {
  DEFAULT_ACTIVE_DATE_PERIOD,
  DEFAULT_DATE_PERIODS,
} from '../../../../shared/constants/date-periods';
import { AddTransactionDialogComponent } from '../../../../shared/modules/add-transaction-dialog';
import { AccountsFacade, TransactionsFacade } from '../../../../state';
import { RouterFacade } from '../../../../state/router';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class TransactionsViewComponent implements OnInit, OnDestroy {
  public readonly transactions$ = this.transactionsFacade.transactions$;
  public readonly transactionsLoading$ = this.transactionsFacade.transactionsLoading$;
  public readonly transactionsLoaded$ = this.transactionsFacade.transactionsLoaded$;
  public readonly transactionsError$ = this.transactionsFacade.transactionsError$;
  public readonly transactionsTotalBalance$ = this.transactionsFacade.transactionsTotalBalance$;

  public readonly datePeriods: MenuItem[] = DEFAULT_DATE_PERIODS;
  public readonly activeDatePeriod: MenuItem = DEFAULT_ACTIVE_DATE_PERIOD;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly accountsFacade: AccountsFacade,
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

    this.accountsFacade.onLoadAccountSuccess$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ account }) => {
        this.transactionsFacade.loadTransactions({ accountId: account.uid });
      });

    this.accountsFacade.onLoadAccountError$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate([AppRoute.Accounts]);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAddTransaction(): void {
    this.dialogService.open(AddTransactionDialogComponent, {
      header: 'Add transaction',
      width: '400px',
    });
  }

  public loadTransactions(): void {
    this.accountsFacade.selectedAccount$
      .pipe(take(1))
      .subscribe(({ uid }) => {
        this.transactionsFacade.loadTransactions({ accountId: uid });
      });
  }
}
