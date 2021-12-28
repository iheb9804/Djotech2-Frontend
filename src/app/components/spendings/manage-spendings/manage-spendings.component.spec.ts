import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpendingsComponent } from './manage-spendings.component';

describe('ManageSpendingsComponent', () => {
  let component: ManageSpendingsComponent;
  let fixture: ComponentFixture<ManageSpendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSpendingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
