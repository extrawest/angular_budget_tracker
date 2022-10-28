import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil } from 'rxjs';

import {
  DEFAULT_ACTIVE_DATE_PERIOD,
  DEFAULT_DATE_PERIODS,
} from '../../../../shared/constants/date-periods';
import { AddTransactionDialogComponent } from '../../../../shared/modules/add-transaction-dialog';
import { TransactionsFacade } from '../../../../state';

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
    private readonly transactionsFacade: TransactionsFacade,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.loadTransactions();
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
    this.activatedRoute.paramMap.pipe(
      take(1),
      takeUntil(this.destroy$),
    ).subscribe((params) => {
      this.transactionsFacade.loadTransactions({ accountId: params.get('accountId') });
    });
  }
}
