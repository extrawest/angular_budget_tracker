import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

import { AddCategoryDialogComponent } from '../../../../shared/modules/add-category-dialog';
import { CategoriesFacade } from '../../../../state/categories/categories.facade';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class HomeViewComponent implements OnInit {
  public readonly categories$ = this.categoriesFacade.categories$;
  public readonly categoriesLoading$ = this.categoriesFacade.categoriesLoading$;

  constructor(
    private readonly categoriesFacade: CategoriesFacade,
    private readonly dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.categoriesFacade.getCategories();
  }

  public onAddCategory(): void {
    this.dialogService.open(AddCategoryDialogComponent, {
      header: 'Add category',
      width: '600px',
    });
  }
}
