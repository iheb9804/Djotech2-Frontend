import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpendingComponent } from './update-spending.component';

describe('UpdateSpendingComponent', () => {
  let component: UpdateSpendingComponent;
  let fixture: ComponentFixture<UpdateSpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
