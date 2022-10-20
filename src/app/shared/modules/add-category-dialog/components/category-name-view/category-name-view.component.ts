import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-name-view',
  templateUrl: './category-name-view.component.html',
  styleUrls: ['./category-name-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryNameViewComponent {
  public readonly form = this.categoryService.form;

  constructor(private readonly categoryService: CategoryService) {
  }
}
