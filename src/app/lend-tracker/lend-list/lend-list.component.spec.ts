import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendListComponent } from './lend-list.component';

describe('LendListComponent', () => {
  let component: LendListComponent;
  let fixture: ComponentFixture<LendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
