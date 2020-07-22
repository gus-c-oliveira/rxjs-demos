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
import {
  InfoCardComponent,
  selector as infoCardSelector,
} from './components/cards/info-card/info-card.component';
import {
  CodeCardComponent,
  selector as codeCardSelector,
} from './components/cards/code-card/code-card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CodeCardComponent,
        ControlComponent,
        HeaderComponent,
        InfoCardComponent,
      ],
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

  it('should display the description info card', () => {
    const card = fixture.debugElement.query(
      By.css(infoCardSelector + '.description')
    ).nativeElement;
    expect(card).toBeTruthy();
  });

  it('should display the output info card', () => {
    const card = fixture.debugElement.query(
      By.css(infoCardSelector + '.output')
    ).nativeElement;
    expect(card).toBeTruthy();
  });

  it('should display the code card', () => {
    const card = fixture.debugElement.query(By.css(codeCardSelector))
      .nativeElement;
    expect(card).toBeTruthy();
  });
});
