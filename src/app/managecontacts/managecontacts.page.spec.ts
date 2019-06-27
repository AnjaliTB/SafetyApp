import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecontactsPage } from './managecontacts.page';

describe('ManagecontactsPage', () => {
  let component: ManagecontactsPage;
  let fixture: ComponentFixture<ManagecontactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecontactsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecontactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
