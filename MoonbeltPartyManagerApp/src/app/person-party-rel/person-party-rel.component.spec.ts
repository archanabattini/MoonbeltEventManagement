import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPartyRelComponent } from './person-party-rel.component';

describe('PersonPartyRelComponent', () => {
  let component: PersonPartyRelComponent;
  let fixture: ComponentFixture<PersonPartyRelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonPartyRelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPartyRelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
