import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

import { AppRoute } from '../../../../enums/app-route.enum';
import { MessageType } from '../../../../enums/message-type.enum';
import { getErrorMessage } from '../../../../shared/helpers/get-error-message';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { passwordMatchingValidator } from '../../../../shared/validators/password-matching.validator';
import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class RegisterViewComponent {
  public readonly AuthRoute = AuthRoute;
  public readonly form = this.fb.nonNullable.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: passwordMatchingValidator });
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

    const { email, password, firstname, lastname } = this.form.getRawValue();

    this.processing = true;
    this.authService.register(email, password, `${firstname} ${lastname}`).pipe(
      finalize(() => this.processing = false),
    ).subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
      complete: () => {
        this.router.navigate(['../', AppRoute.Auth, AuthRoute.VerifyEmail]);
      },
    });
  }

  public onSignUpWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
    });
  }

  public onSignUpWithFacebook(): void {
    this.authService.signInWithFacebook().subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
    });
  }

  private showErrorMessage(error: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: MessageType.Error,
      detail: getErrorMessage(error),
      closable: false,
    });
  }
}
