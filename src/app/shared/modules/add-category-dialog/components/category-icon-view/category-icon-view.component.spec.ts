import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIconViewComponent } from './category-icon-view.component';

describe('CategoryIconViewComponent', () => {
  let component: CategoryIconViewComponent;
  let fixture: ComponentFixture<CategoryIconViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryIconViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryIconViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
