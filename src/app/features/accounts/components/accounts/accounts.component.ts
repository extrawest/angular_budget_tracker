import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppRoute } from '../../../../enums/app-route.enum';
import { Account } from '../../../../models/account.model';

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
}
