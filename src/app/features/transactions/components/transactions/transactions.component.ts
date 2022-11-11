import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dictionary } from '@ngrx/entity';

import { Category } from '../../../../models/category.model';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { TransactionGroup } from '../../mappers/group-transactions-by-date.mapper';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  @Input() public transactions: TransactionGroup[];
  @Input() public categories: Dictionary<Category>;
  @Input() public loading: boolean;
  @Input() public loaded: boolean;
  @Input() public error: HttpErrorResponse;

  public readonly currency$ = this.currencyService.currentCurrency$;

  constructor(
    private readonly currencyService: CurrencyService,
  ) {}
}
