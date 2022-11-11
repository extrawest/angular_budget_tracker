import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AppRoute } from '../../../../enums/app-route.enum';
import { Account } from '../../../../models/account.model';
import { CurrencyService } from '../../../../shared/services/currency.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  @Input() public accounts: Account[];
  @Input() public loading: boolean;
  @Input() public loaded: boolean;
  @Input() public error: HttpErrorResponse;

  public readonly AppRoute = AppRoute;

  public readonly currency$: Observable<string> = this.currencyService.currentCurrency$;

  constructor(
    private readonly currencyService: CurrencyService,
  ) {}
}
