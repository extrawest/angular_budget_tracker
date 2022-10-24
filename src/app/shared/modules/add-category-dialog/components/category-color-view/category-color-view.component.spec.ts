import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryColorViewComponent } from './category-color-view.component';

describe('CategoryColorViewComponent', () => {
  let component: CategoryColorViewComponent;
  let fixture: ComponentFixture<CategoryColorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryColorViewComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryColorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
