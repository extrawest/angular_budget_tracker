import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOverviewViewComponent } from './category-overview-view.component';

describe('CategoryOverviewViewComponent', () => {
  let component: CategoryOverviewViewComponent;
  let fixture: ComponentFixture<CategoryOverviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryOverviewViewComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryOverviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
