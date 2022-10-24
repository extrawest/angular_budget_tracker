import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-name-view',
  templateUrl: './category-name-view.component.html',
  styleUrls: ['./category-name-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryService],
})
export class CategoryNameViewComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
  });

  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  public onSubmit(): void {
    // this.categoryService.form.registerControl()
  }
}
