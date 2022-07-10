/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavImageComponent } from './nav-image.component';

describe('NavImageComponent', () => {
  let component: NavImageComponent;
  let fixture: ComponentFixture<NavImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
