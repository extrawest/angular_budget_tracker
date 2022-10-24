import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  @Input() categories: Category[];
}
