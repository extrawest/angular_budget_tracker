import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { mergeWith, take, tap } from 'rxjs';

import { AccountsFacade } from '../../../state';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAccountDialogComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  public processing = false;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly accountsFacade: AccountsFacade,
  ) {}

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.accountsFacade.addAccount({ ...this.form.getRawValue() });

    this.accountsFacade.onAddAccountError$.pipe(
      mergeWith(this.accountsFacade.onAddAccountSuccess$.pipe(
        tap(() => this.dialogRef.close())),
      ),
      tap(() => this.processing = false),
    ).pipe(take(1)).subscribe();
  }
}
