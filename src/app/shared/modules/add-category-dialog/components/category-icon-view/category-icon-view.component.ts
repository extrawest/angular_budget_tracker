import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

import { MATERIAL_ICONS } from '../../../../../../assets/configs/material-icons';
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

  public readonly icons$ = this.search.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(500),
    map((query) => {
      if (!query) {
        return MATERIAL_ICONS;
      }
      return MATERIAL_ICONS.filter((icon) => icon.label.toLowerCase().includes(query.trim().toLowerCase()));
    }),
    startWith(MATERIAL_ICONS),
  );

  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  public onSelectIcon(icon: string): void {
    this.form.controls.icon.patchValue(icon);
  }
}
