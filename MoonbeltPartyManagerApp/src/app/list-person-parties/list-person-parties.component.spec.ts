import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonPartiesComponent } from './list-person-parties.component';

describe('ListPersonPartiesComponent', () => {
  let component: ListPersonPartiesComponent;
  let fixture: ComponentFixture<ListPersonPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPersonPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
