import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export const selector = 'app-header';

@Component({
  selector,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public title = '';
}
