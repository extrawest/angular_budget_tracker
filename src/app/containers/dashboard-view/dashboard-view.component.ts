import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BackLink } from '../../models/route-data.model';
import { RouterFacade } from '../../state/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent {
  public readonly title$: Observable<string> = this.routerFacade.getDataItem('title');
  public readonly backLink$: Observable<BackLink> = this.routerFacade.getDataItem('backLink');

  constructor(
    private readonly routerFacade: RouterFacade,
  ) {}
}
