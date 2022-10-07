import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { MessageType } from '../../../../enums/message-type.enum';
import { getErrorMessage } from '../../../../shared/helpers/get-error-message';
import { AuthService } from '../../../../shared/services/auth.service';
import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class LoginViewComponent {
  public readonly AuthRoute = AuthRoute;
  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  public processing = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {}

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.processing = true;
    this.messageService.clear();
    this.authService.login(email, password).subscribe({
      error: (error) => {
        this.processing = false;
        this.messageService.add({
          severity: MessageType.Danger,
          detail: getErrorMessage(error.code),
          closable: true,
        });
      },
      complete: () => {
        this.processing = false;
        this.redirectToHomePage();
      },
    });
  }

  public onSignUpWithGoogle(): void {
    this.authService.signInWithGoogle().then(() => {
      this.redirectToHomePage();
    });
  }

  public onSignUpWithFacebook(): void {
    this.authService.signInWithFacebook().then(() => {
      this.redirectToHomePage();
    });
  }

  private redirectToHomePage(): void {
    this.router.navigate(['/']);
  }
}
