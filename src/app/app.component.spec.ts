import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  ControlComponent,
  selector as controlSelector,
} from './components/control/control.component';
import {
  HeaderComponent,
  selector as headerSelector,
} from './components/header/header.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ControlComponent, HeaderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display the header component', () => {
    const header = fixture.debugElement.query(By.css(headerSelector));
    expect(header).toBeTruthy();
  });

  it('should display the control component', () => {
    const control = fixture.debugElement.query(By.css(controlSelector));
    expect(control).toBeTruthy();
  });
});
