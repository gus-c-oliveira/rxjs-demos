import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  CodeCardComponent,
  selector as codeCardSelector,
} from './code-card.component';

@Component({
  selector: 'app-test-host',
  template: ` <app-code-card [code]="code"></app-code-card> `,
})
class HostComponent {
  public code = ['First line of code', 'Second line of code'];
}

describe('CodeCardComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeCardComponent, HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const card = fixture.debugElement.query(By.css(codeCardSelector))
      .nativeElement;
    expect(card).toBeTruthy();
  });

  it('should display the lines of code provided as input', () => {
    const numbers = fixture.debugElement
      .queryAll(By.css('number'))
      .map((el) => el.nativeElement.textContent.trim());
    const lines = fixture.debugElement
      .queryAll(By.css('.code-line'))
      .map((line) => line.nativeElement.textContent.trim());
    lines.forEach((line, index) =>
      expect(numbers[index] + ' ' + line).toEqual(
        numbers[index] + ' ' + host.code[index]
      )
    );
  });
});
