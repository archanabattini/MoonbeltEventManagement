import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartyPersonsComponent } from './list-party-persons.component';

describe('ListPartyPersonsComponent', () => {
  let component: ListPartyPersonsComponent;
  let fixture: ComponentFixture<ListPartyPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartyPersonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartyPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
