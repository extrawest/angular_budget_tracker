import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountBalanceComponent {
  @Input() public balance: number;
  @Input() public loading: boolean;
}
