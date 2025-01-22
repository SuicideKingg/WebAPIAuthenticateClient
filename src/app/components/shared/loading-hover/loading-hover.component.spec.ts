import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHoverComponent } from './loading-hover.component';

describe('LoadingHoverComponent', () => {
  let component: LoadingHoverComponent;
  let fixture: ComponentFixture<LoadingHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingHoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
