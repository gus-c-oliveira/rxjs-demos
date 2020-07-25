import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppConstants } from './app.constants';
import { Demos } from './demos';

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
  private subscription: Subscription | Subscription[] = null;

  public constructor() {
    Demos.forEach((demo, index) => {
      this.listOfDemos.push({ id: index, title: demo.title });
    });
  }

  public updateSelection(selected) {
    this.disposeSubscription();
    this.selectedDemo = selected;
    this.description = Demos[this.selectedDemo].description;
    this.code = Demos[this.selectedDemo].code;
    const runArtifacts = Demos[this.selectedDemo].run();
    this.subscription = runArtifacts.subscription;
    this.demoOutput = runArtifacts.results;
  }

  private disposeSubscription() {
    if (!this.subscription) {
      return;
    }
    if (Array.isArray(this.subscription)) {
      this.subscription.forEach((subs) => {
        subs.unsubscribe();
        subs = null;
      });
      return;
    }
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  public ngOnDestroy() {
    this.disposeSubscription();
  }
}
