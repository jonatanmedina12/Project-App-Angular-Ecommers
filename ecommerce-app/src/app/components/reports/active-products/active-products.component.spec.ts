import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProductsComponent } from './active-products.component';

describe('ActiveProductsComponent', () => {
  let component: ActiveProductsComponent;
  let fixture: ComponentFixture<ActiveProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveProductsComponent]
    });
    fixture = TestBed.createComponent(ActiveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
