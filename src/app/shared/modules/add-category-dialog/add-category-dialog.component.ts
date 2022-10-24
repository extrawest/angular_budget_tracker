import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { mergeWith, take, tap } from 'rxjs';

import { CategoriesFacade } from '../../../state';

import { STEPPER_CONFIG, STEPPER_MENU_CONFIG } from './constants/stepper';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryService],
})
export class AddCategoryDialogComponent {
  public readonly stepperMenuConfig = STEPPER_MENU_CONFIG;
  public readonly stepperConfig = STEPPER_CONFIG;

  public stepperSelectedIndex = 0;
  public processing = false;

  private readonly form = this.categoryService.form;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly categoriesFacade: CategoriesFacade,
    private readonly categoryService: CategoryService,
  ) {}

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.categoriesFacade.addCategory({ ...this.form.getRawValue() });

    this.categoriesFacade.onAddCategoryError$.pipe(
      mergeWith(
        this.categoriesFacade.onAddCategorySuccess$.pipe(tap(() => this.dialogRef.close())),
      ),
      tap(() => this.processing = false),
    ).pipe(
      take(1),
    ).subscribe();
  }

  public onSelectionChange(event: StepperSelectionEvent): void {
    this.stepperSelectedIndex = event.selectedIndex;
  }
}
