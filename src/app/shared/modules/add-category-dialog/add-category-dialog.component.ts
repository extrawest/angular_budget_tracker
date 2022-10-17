import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { mergeWith, take, tap } from 'rxjs';
import { merge } from 'rxjs/internal/operators/merge';

import { AppRoute } from '../../../enums/app-route.enum';
import { MessageType } from '../../../enums/message-type.enum';
import { CategoriesFacade } from '../../../state/categories/categories.facade';
import { getErrorMessage } from '../../helpers/get-error-message';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryDialogComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
  });

  public processing = false;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly categoriesFacade: CategoriesFacade,
  ) {}

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description } = this.form.getRawValue();

    this.processing = true;
    this.categoriesFacade.addCategory({ name, description });

    console.log('+++')

    this.categoriesFacade.onAddCategoryError$.pipe(
      mergeWith(
        this.categoriesFacade.onAddCategorySuccess$.pipe(tap(() => this.dialogRef.close())),
      ),
      tap(() => this.processing = false),
    ).pipe(take(1)).subscribe();
  }
}
