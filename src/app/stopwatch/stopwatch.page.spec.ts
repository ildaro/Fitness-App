import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopwatchPage } from './stopwatch.page';

describe('StopwatchPage', () => {
  let component: StopwatchPage;
  let fixture: ComponentFixture<StopwatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopwatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopwatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
