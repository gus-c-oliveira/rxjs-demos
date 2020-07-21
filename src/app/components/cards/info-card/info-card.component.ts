import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export const selector = 'app-info-card';

@Component({
  selector,
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardComponent {
  @Input() public title = '';
}
