import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

export const selector = 'app-control';

@Component({
  selector,
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  // Options to be displayed in the control.
  // Each option represents an available demo.
  @Input() public options: { id: number; title: string }[] = [];

  // The id of the option selected by the user.
  @Output() public selected = new EventEmitter<number>();

  public formControl = new FormControl();

  public emitSelected() {
    this.selected.emit(this.formControl.value);
  }
}
