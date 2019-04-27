import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginuserPage } from './loginuser.page';

describe('LoginuserPage', () => {
  let component: LoginuserPage;
  let fixture: ComponentFixture<LoginuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
