import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MATERIAL_ICONS_LIST} from "../../../../../../assets/icons/material-icons";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-icon-view',
  templateUrl: './category-icon-view.component.html',
  styleUrls: ['./category-icon-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryIconViewComponent {
  public readonly form = this.categoryService.form;
  public readonly materialIconsList = MATERIAL_ICONS_LIST;

  constructor(private readonly categoryService: CategoryService) {
  }

  public onSelectIcon(): void {
  }
}
