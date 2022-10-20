import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNameViewComponent } from './category-name-view.component';

describe('CategoryNameViewComponent', () => {
  let component: CategoryNameViewComponent;
  let fixture: ComponentFixture<CategoryNameViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryNameViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
