import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppConstants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public readonly appTitle = AppConstants.AppTitle;
  public listOfDemos: { id: number; title: string }[] = [];
  public description = '';
  public code: string[] = [];
  public demoOutput: any[] = [];
  public selectedDemo: number = null;
  private subscription: Subscription = null;

  public constructor() {
    AppConstants.Demos.forEach((demo, index) => {
      this.listOfDemos.push({ id: index, title: demo.title });
    });
  }

  public updateSelection(selected) {
    this.disposeSubscription();
    this.selectedDemo = selected;
    this.description = AppConstants.Demos[this.selectedDemo].description;
    this.code = AppConstants.Demos[this.selectedDemo].code;
    const runArtifacts = AppConstants.Demos[this.selectedDemo].run();
    this.subscription = runArtifacts.subscription;
    this.demoOutput = runArtifacts.results;
  }

  private disposeSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  public ngOnDestroy() {
    this.disposeSubscription();
  }
}
