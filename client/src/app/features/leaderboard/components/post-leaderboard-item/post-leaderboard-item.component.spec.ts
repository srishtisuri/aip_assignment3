import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLeaderboardItemComponent } from './post-leaderboard-item.component';

describe('PostLeaderboardItemComponent', () => {
  let component: PostLeaderboardItemComponent;
  let fixture: ComponentFixture<PostLeaderboardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLeaderboardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLeaderboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
