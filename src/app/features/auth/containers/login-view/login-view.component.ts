import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

import { MessageType } from '../../../../enums/message-type.enum';
import { getErrorMessage } from '../../../../shared/helpers/get-error-message';
import { AuthService } from '../../../../shared/services/api/auth.service';
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

    this.authService.login(email, password).pipe(
      finalize(() => this.processing = false),
    ).subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
      complete: () => this.redirectToHomePage(),
    });
  }

  public onSignInWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
      complete: () => this.redirectToHomePage(),
    });
  }

  public onSignInWithFacebook(): void {
    this.authService.signInWithFacebook().subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
      complete: () => this.redirectToHomePage(),
    });
  }

  private redirectToHomePage(): void {
    this.router.navigate(['/']);
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
