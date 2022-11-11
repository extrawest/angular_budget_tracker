import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountBalanceComponent {
  @Input() public balance: number;
  @Input() public loading: boolean;

  public readonly currency$: Observable<string> = this.currencyService.currentCurrency$;

  constructor(
    private readonly currencyService: CurrencyService,
  ) {}
}
