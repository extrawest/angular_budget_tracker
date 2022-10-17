import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  @Input() categories: Category[];
  @Input() loading: boolean;

  @Output() addCategory = new EventEmitter<void>();

  public readonly menu: MenuItem[] = [{
    label: 'Add category',
    command: () => this.onAddCategory(),
  }, {
    label: 'Edit categories',
  }];

  public onAddCategory(): void {
    this.addCategory.emit();
  }
}
