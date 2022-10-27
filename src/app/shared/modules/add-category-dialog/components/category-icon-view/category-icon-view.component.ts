import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-icon-view',
  templateUrl: './category-icon-view.component.html',
  styleUrls: ['./category-icon-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryIconViewComponent {
  public readonly form = this.categoryService.form;
  public readonly search = new FormControl('');

  constructor(
    private readonly categoryService: CategoryService,
  ) {}
}
