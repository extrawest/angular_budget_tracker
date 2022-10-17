import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionDialogComponent {
}
