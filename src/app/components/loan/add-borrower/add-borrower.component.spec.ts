import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBorrowerComponent } from './add-borrower.component';

describe('AddBorrowerComponent', () => {
  let component: AddBorrowerComponent;
  let fixture: ComponentFixture<AddBorrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBorrowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
