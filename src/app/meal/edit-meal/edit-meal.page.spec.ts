import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMealPage } from './edit-meal.page';

describe('EditMealPage', () => {
  let component: EditMealPage;
  let fixture: ComponentFixture<EditMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
