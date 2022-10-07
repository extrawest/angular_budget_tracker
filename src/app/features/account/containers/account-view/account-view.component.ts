import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountViewComponent {
  public readonly user$ = this.authService.currentUser$;

  constructor(private readonly authService: AuthService) {
  }
}
