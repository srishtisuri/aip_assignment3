import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentItemComponent } from './post-comment-item.component';

describe('PostCommentItemComponent', () => {
  let component: PostCommentItemComponent;
  let fixture: ComponentFixture<PostCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
