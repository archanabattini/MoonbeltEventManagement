import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDrinkComponent } from './list-drink.component';

describe('ListDrinkComponent', () => {
  let component: ListDrinkComponent;
  let fixture: ComponentFixture<ListDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDrinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
