import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxeBlogComponent } from './boxe-blog.component';

describe('BoxeBlogComponent', () => {
  let component: BoxeBlogComponent;
  let fixture: ComponentFixture<BoxeBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxeBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxeBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
