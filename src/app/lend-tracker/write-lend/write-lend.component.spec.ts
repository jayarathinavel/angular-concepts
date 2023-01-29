import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLendComponent } from './write-lend.component';

describe('WriteLendComponent', () => {
  let component: WriteLendComponent;
  let fixture: ComponentFixture<WriteLendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteLendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteLendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
