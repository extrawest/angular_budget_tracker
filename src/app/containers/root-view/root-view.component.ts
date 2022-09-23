import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootViewComponent {}
