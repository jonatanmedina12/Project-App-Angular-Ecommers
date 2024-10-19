import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSalesComponent } from './top-sales.component';

describe('TopSalesComponent', () => {
  let component: TopSalesComponent;
  let fixture: ComponentFixture<TopSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopSalesComponent]
    });
    fixture = TestBed.createComponent(TopSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
