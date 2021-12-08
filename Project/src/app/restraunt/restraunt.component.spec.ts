import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrauntComponent } from './restraunt.component';

describe('RestrauntComponent', () => {
  let component: RestrauntComponent;
  let fixture: ComponentFixture<RestrauntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrauntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrauntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
