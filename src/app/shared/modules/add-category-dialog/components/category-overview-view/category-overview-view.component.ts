import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-category-overview-view',
  templateUrl: './category-overview-view.component.html',
  styleUrls: ['./category-overview-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOverviewViewComponent {
}
