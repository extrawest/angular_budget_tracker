import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Account } from '../../../../models/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  @Input() accounts: Account[];
}
