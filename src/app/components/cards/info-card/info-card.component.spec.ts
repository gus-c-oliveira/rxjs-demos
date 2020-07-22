import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  InfoCardComponent,
  selector as infoCardSelector,
} from './info-card.component';

@Component({
  selector: 'app-test-host',
  template: `
    <app-info-card [title]="title">
      <p class="content">{{ content }}</p>
    </app-info-card>
  `,
})
class HostComponent {
  public title = 'Test Title';
  public content = 'Test Content';
}

describe('InfoCardComponent', () => {
  let host: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, InfoCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const card = fixture.debugElement.query(By.css(infoCardSelector))
      .nativeElement;
    expect(card).toBeTruthy();
  });

  it('should display a header containing the card title', () => {
    const headerText = fixture.debugElement
      .query(By.css('h2'))
      .nativeElement.textContent.trim();
    expect(headerText).toEqual(host.title);
  });

  it('should display the card content using content projection', () => {
    const contentText = fixture.debugElement
      .query(By.css('.content'))
      .nativeElement.textContent.trim();
    expect(contentText).toEqual(host.content);
  });
});
