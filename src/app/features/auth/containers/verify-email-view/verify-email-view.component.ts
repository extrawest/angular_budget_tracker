import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'firebase/auth';

import { AuthService } from '../../../../shared/services/auth.service';
import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-verify-email-view',
  templateUrl: './verify-email-view.component.html',
  styleUrls: ['./verify-email-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailViewComponent {
  public readonly currentUser$ = this.authService.currentUser$;
  public readonly AuthRoute = AuthRoute;

  constructor(private readonly authService: AuthService) { }

  public onResendVerificationEmail(user: User): void {
    this.authService.sendEmailVerification(user).subscribe();
  }
}
