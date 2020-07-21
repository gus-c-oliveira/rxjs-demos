import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ControlComponent } from './control.component';

@Component({
  selector: 'app-test-host',
  template: `
    <app-control
      [options]="options"
      (selected)="saveSelected($event)"
    ></app-control>
  `,
})
class HostComponent {
  public options = [
    { id: 0, title: 'Option 0' },
    { id: 1, title: 'Option 1' },
    { id: 2, title: 'Option 2' },
  ];
  public selectedOption = null;

  public saveSelected(selected: number) {
    this.selectedOption = selected;
  }
}

describe('ControlComponent', () => {
  let host: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      declarations: [ControlComponent, HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const control = fixture.debugElement.query(By.css('app-control'))
      .nativeElement;
    expect(control).toBeTruthy();
  });

  it('should display the option titles in mat-select', async () => {
    fixture.debugElement
      .query(By.css('.mat-select-trigger'))
      .nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      const displayedOptions = fixture.debugElement
        .queryAll(By.css('.mat-option-text'))
        .map((matOption) => matOption.nativeElement.textContent.trim());
      const inputOptionTitles = host.options.map((option) => option.title);
      expect(displayedOptions.length).toEqual(inputOptionTitles.length);
      displayedOptions.forEach((option, index) =>
        expect(option).toEqual(inputOptionTitles[index])
      );
    });
  });

  it('should emit the selected option id to the parent component', async () => {
    fixture.debugElement
      .query(By.css('.mat-select-trigger'))
      .nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      const displayedOptions = fixture.debugElement.queryAll(
        By.css('.mat-option-text')
      );
      const optionToSelect = 1;
      displayedOptions[optionToSelect].nativeElement.click();
      expect(host.selectedOption).toEqual(host.options[optionToSelect].id);
    });
  });
});
