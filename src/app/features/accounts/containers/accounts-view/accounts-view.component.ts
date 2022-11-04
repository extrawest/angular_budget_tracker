import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatePeriod } from '../../../../enums/date-period.enum';
import { datePeriodToTimestamp } from '../../../../shared/helpers/date-period-to-timestamp';
import { DialogService } from '../../../../shared/services/dialog.service';
import { AccountsFacade } from '../../../../state';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsViewComponent implements OnInit, OnDestroy {
  public readonly accounts$ = this.accountsFacade.accounts$;
  public readonly accountsLoading$ = this.accountsFacade.accountsLoading$;
  public readonly accountsLoaded$ = this.accountsFacade.accountsLoaded$;
  public readonly accountsError$ = this.accountsFacade.accountsError$;
  public readonly accountsTotalBalance$ = this.accountsFacade.accountsTotalBalance$;

  public readonly period$ = new BehaviorSubject<DatePeriod>(DatePeriod.Month);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly accountsFacade: AccountsFacade,
    private readonly dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.loadAccounts();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAddAccount(): void {
    this.dialogService.openAddAccountDialog();
  }

  public loadAccounts(): void {
    this.period$
      .pipe(
        map(datePeriodToTimestamp),
        takeUntil(this.accountsFacade.onAddAccountSuccess$.pipe(
          tap(() => this.loadAccounts()),
        )),
        takeUntil(this.destroy$),
      )
      .subscribe((period) => {
        this.accountsFacade.loadAccounts({ period });
      });
  }
}
