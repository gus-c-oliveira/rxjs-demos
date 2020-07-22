import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export const selector = 'app-code-card';

@Component({
  selector,
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCardComponent {
  @Input() code: string[] = [];
}
