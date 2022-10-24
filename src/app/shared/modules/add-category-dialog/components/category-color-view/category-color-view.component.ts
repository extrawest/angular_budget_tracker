import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-color-view',
  templateUrl: './category-color-view.component.html',
  styleUrls: ['./category-color-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryColorViewComponent {
  public readonly form = this.categoryService.form;
  public readonly icon = this.form.controls.icon.value;

  constructor(
    private readonly categoryService: CategoryService,
  ) {}
}
