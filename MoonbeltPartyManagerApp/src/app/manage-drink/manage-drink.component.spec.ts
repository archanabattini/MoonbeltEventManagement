import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDrinkComponent } from './manage-drink.component';

describe('ManageDrinkComponent', () => {
  let component: ManageDrinkComponent;
  let fixture: ComponentFixture<ManageDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDrinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
