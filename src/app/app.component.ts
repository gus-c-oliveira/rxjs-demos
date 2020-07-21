import { Component } from '@angular/core';
import { AppConstants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly appTitle = AppConstants.AppTitle;
  public demos = [
    { id: 0, title: 'Demo 1' },
    { id: 1, title: 'Demo 2' },
  ];
  private selectedDemo = null;

  public updateSelection(selected) {
    this.selectedDemo = selected;
  }
}
